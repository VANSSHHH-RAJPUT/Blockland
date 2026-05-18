import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class LandData {
  final int landId;
  final String khasraNumber;
  final String location;
  final int areaSqFt;
  final String ownerAddress;
  final String ipfsHash;
  final bool isDisputed;
  final String? verifyUrl;

  LandData({
    required this.landId,
    required this.khasraNumber,
    required this.location,
    required this.areaSqFt,
    required this.ownerAddress,
    required this.ipfsHash,
    this.isDisputed = false,
    this.verifyUrl,
  });

  factory LandData.fromJson(Map<String, dynamic> json) {
    return LandData(
      landId: json['data']['landId'] ?? 0,
      khasraNumber: json['data']['khasraNumber'] ?? '',
      location: json['data']['location'] ?? '',
      areaSqFt: json['data']['areaSqFt'] ?? 0,
      ownerAddress: json['data']['ownerAddress'] ?? '',
      ipfsHash: json['ipfsHash'] ?? '',
      isDisputed: json['data']['isDisputed'] ?? false,
      verifyUrl: json['verifyUrl'],
    );
  }
}

class LandProvider with ChangeNotifier {
  List<LandData> _lands = [];
  bool _isLoading = false;
  String? _error;

  List<LandData> get lands => _lands;
  bool get isLoading => _isLoading;
  String? get error => _error;

  // ⚠️ Replace with your PC's local IP (run: ipconfig)
  static const String _baseUrl = 'http://192.168.1.x:5000/api/land';

  Future<void> fetchLand(int landId) async {
    try {
      _isLoading = true;
      _error = null;
      notifyListeners();
      final res = await http.get(Uri.parse('$_baseUrl/$landId'));
      if (res.statusCode == 200) {
        _lands = [LandData.fromJson(jsonDecode(res.body))];
      } else {
        _error = 'Land ID $landId not found';
      }
    } catch (e) {
      _error = 'Backend offline. Start server first!';
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }
}
