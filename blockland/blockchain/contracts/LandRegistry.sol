// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LandRegistry {

    struct Land {
        uint256 landId;
        string khasraNumber;
        string location;
        uint256 areaSqFt;
        address payable owner;
        string documentIPFSHash;
        bool isDisputed;
        bool isRegistered;
    }

    struct TransferHistory {
        address from;
        address to;
        uint256 timestamp;
    }

    mapping(uint256 => Land) public lands;
    mapping(uint256 => TransferHistory[]) public transferHistory;

    uint256 public landCount;
    address public admin;

    event LandRegistered(uint256 landId, address owner, string khasraNumber);
    event OwnershipTransferred(uint256 landId, address from, address to);
    event DisputeFlagged(uint256 landId, bool status);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this");
        _;
    }

    modifier onlyOwner(uint256 _landId) {
        require(lands[_landId].owner == msg.sender, "Not the land owner");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    // Admin registers a new land parcel
    function registerLand(
        string memory _khasraNumber,
        string memory _location,
        uint256 _areaSqFt,
        address payable _owner,
        string memory _documentIPFSHash
    ) public onlyAdmin {
        landCount++;
        lands[landCount] = Land({
            landId: landCount,
            khasraNumber: _khasraNumber,
            location: _location,
            areaSqFt: _areaSqFt,
            owner: _owner,
            documentIPFSHash: _documentIPFSHash,
            isDisputed: false,
            isRegistered: true
        });

        emit LandRegistered(landCount, _owner, _khasraNumber);
    }

    // Owner transfers land to a new owner
    function transferOwnership(uint256 _landId, address payable _newOwner)
        public onlyOwner(_landId)
    {
        require(!lands[_landId].isDisputed, "Land is under dispute");
        require(_newOwner != address(0), "Invalid address");

        address previousOwner = lands[_landId].owner;
        lands[_landId].owner = _newOwner;

        transferHistory[_landId].push(TransferHistory({
            from: previousOwner,
            to: _newOwner,
            timestamp: block.timestamp
        }));

        emit OwnershipTransferred(_landId, previousOwner, _newOwner);
    }

    // Admin flags or unflags a dispute on a land parcel
    function setDisputeFlag(uint256 _landId, bool _status) public onlyAdmin {
        lands[_landId].isDisputed = _status;
        emit DisputeFlagged(_landId, _status);
    }

    // Public: get full land details by ID
    function getLand(uint256 _landId) public view returns (Land memory) {
        require(lands[_landId].isRegistered, "Land not found");
        return lands[_landId];
    }

    // Public: get full ownership transfer history
    function getTransferHistory(uint256 _landId)
        public view returns (TransferHistory[] memory)
    {
        return transferHistory[_landId];
    }

    // Public: get current owner of a land parcel
    function getOwner(uint256 _landId) public view returns (address) {
        require(lands[_landId].isRegistered, "Land not found");
        return lands[_landId].owner;
    }

    // Public: check if land is disputed
    function isDisputed(uint256 _landId) public view returns (bool) {
        return lands[_landId].isDisputed;
    }
}
