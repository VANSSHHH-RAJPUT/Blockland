import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class AdminScreen extends StatefulWidget {
  @override
  _AdminScreenState createState() => _AdminScreenState();
}

class _AdminScreenState extends State<AdminScreen> {
  final _khasraCtrl = TextEditingController();
  final _locationCtrl = TextEditingController();
  final _areaCtrl = TextEditingController();
  final _ownerCtrl = TextEditingController();
  final _ipfsCtrl = TextEditingController();
  final _disputeIdCtrl = TextEditingController();
  String _disputeStatus = 'Mark as Disputed';

  Widget _buildInput(TextEditingController c, String hint,
      {bool isNumber = false}) {
    return Container(
      height: 48,
      margin: EdgeInsets.only(bottom: 10),
      decoration: BoxDecoration(
        color: Color(0xFF1A1A2E),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      child: TextField(
        controller: c,
        style: TextStyle(color: Colors.white, fontSize: 13),
        keyboardType: isNumber ? TextInputType.number : TextInputType.text,
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: TextStyle(color: Colors.white38, fontSize: 13),
          border: InputBorder.none,
          contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 13),
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      child: SafeArea(
        child: Padding(
          padding: EdgeInsets.all(20),
          child:
              Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
            // Header
            Row(children: [
              Icon(Icons.account_balance, color: Color(0xFFFF1744), size: 26),
              SizedBox(width: 10),
              Text('Admin Dashboard',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold)),
            ]).animate().fadeIn(duration: 500.ms).slideY(begin: -0.2),
            SizedBox(height: 6),
            Text('Sub-Registrar Panel — Register land parcels & manage disputes',
                    style: TextStyle(color: Colors.white54, fontSize: 13))
                .animate()
                .fadeIn(delay: 100.ms),

            SizedBox(height: 24),

            // Register Card
            Container(
              padding: EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Color(0xFF111118),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white.withOpacity(0.08)),
              ),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(children: [
                      Icon(Icons.app_registration,
                          color: Color(0xFFFF1744), size: 18),
                      SizedBox(width: 8),
                      Text('Register New Land Parcel',
                          style: TextStyle(
                              color: Color(0xFFFF1744),
                              fontWeight: FontWeight.bold,
                              fontSize: 15)),
                    ]),
                    SizedBox(height: 16),
                    _buildInput(_khasraCtrl, 'Khasra Number (e.g. KH-1042)'),
                    _buildInput(
                        _locationCtrl, 'Location (e.g. Haridwar, Uttarakhand)'),
                    _buildInput(_areaCtrl, 'Area in sq ft (e.g. 2400)',
                        isNumber: true),
                    _buildInput(_ownerCtrl, 'Owner Wallet Address (0x...)'),
                    _buildInput(_ipfsCtrl, 'IPFS Document Hash (optional)'),
                    SizedBox(height: 6),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Color(0xFFFF1744),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10)),
                          elevation: 0,
                        ),
                        child: Text('Register on Blockchain',
                            style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ),
                  ]),
            ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.2),

            SizedBox(height: 16),

            // Dispute Card
            Container(
              padding: EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Color(0xFF111118),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white.withOpacity(0.08)),
              ),
              child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(children: [
                      Icon(Icons.flag, color: Color(0xFF3D5AF1), size: 18),
                      SizedBox(width: 8),
                      Text('Manage Dispute Flag',
                          style: TextStyle(
                              color: Color(0xFF3D5AF1),
                              fontWeight: FontWeight.bold,
                              fontSize: 15)),
                    ]),
                    SizedBox(height: 8),
                    Text(
                        'Flag land parcels involved in legal disputes to warn potential buyers.',
                        style: TextStyle(color: Colors.white54, fontSize: 13)),
                    SizedBox(height: 16),
                    _buildInput(_disputeIdCtrl, 'Land ID', isNumber: true),
                    Container(
                      padding: EdgeInsets.symmetric(horizontal: 14),
                      decoration: BoxDecoration(
                        color: Color(0xFF1A1A2E),
                        borderRadius: BorderRadius.circular(10),
                        border:
                            Border.all(color: Colors.white.withOpacity(0.08)),
                      ),
                      child: DropdownButton<String>(
                        value: _disputeStatus,
                        isExpanded: true,
                        dropdownColor: Color(0xFF1A1A2E),
                        underline: SizedBox(),
                        style: TextStyle(color: Colors.white, fontSize: 13),
                        icon: Icon(Icons.keyboard_arrow_down,
                            color: Colors.white54),
                        items: ['Mark as Disputed', 'Clear Dispute']
                            .map((s) =>
                                DropdownMenuItem(value: s, child: Text(s)))
                            .toList(),
                        onChanged: (val) =>
                            setState(() => _disputeStatus = val!),
                      ),
                    ),
                    SizedBox(height: 10),
                    SizedBox(
                      width: double.infinity,
                      height: 50,
                      child: ElevatedButton(
                        onPressed: () {},
                        style: ElevatedButton.styleFrom(
                          backgroundColor: Color(0xFFFF1744),
                          foregroundColor: Colors.white,
                          shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(10)),
                          elevation: 0,
                        ),
                        child: Text('Update Flag on Blockchain',
                            style: TextStyle(fontWeight: FontWeight.bold)),
                      ),
                    ),
                    SizedBox(height: 14),
                    Container(
                      padding: EdgeInsets.all(14),
                      decoration: BoxDecoration(
                        color: Color(0xFF111C33),
                        borderRadius: BorderRadius.circular(10),
                        border: Border.all(
                            color: Color(0xFF3D5AF1).withOpacity(0.3)),
                      ),
                      child: Row(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Icon(Icons.info_outline,
                                color: Color(0xFF3D5AF1), size: 17),
                            SizedBox(width: 10),
                            Expanded(
                                child: Column(
                                    crossAxisAlignment:
                                        CrossAxisAlignment.start,
                                    children: [
                                  Text('How it works',
                                      style: TextStyle(
                                          color: Color(0xFF3D5AF1),
                                          fontWeight: FontWeight.bold,
                                          fontSize: 13)),
                                  SizedBox(height: 4),
                                  Text(
                                      'Once flagged, any citizen searching this land ID will see a DISPUTED warning before any transaction.',
                                      style: TextStyle(
                                          color: Colors.white54,
                                          fontSize: 12,
                                          height: 1.4)),
                                ])),
                          ]),
                    ),
                  ]),
            ).animate().fadeIn(delay: 400.ms).slideY(begin: 0.2),

            SizedBox(height: 30),
          ]),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _khasraCtrl.dispose();
    _locationCtrl.dispose();
    _areaCtrl.dispose();
    _ownerCtrl.dispose();
    _ipfsCtrl.dispose();
    _disputeIdCtrl.dispose();
    super.dispose();
  }
}
