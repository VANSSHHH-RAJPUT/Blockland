import 'package:flutter/material.dart';
import 'package:flutter_animate/flutter_animate.dart';

class TransferScreen extends StatefulWidget {
  @override
  _TransferScreenState createState() => _TransferScreenState();
}

class _TransferScreenState extends State<TransferScreen> {
  final _landIdCtrl = TextEditingController();
  final _newOwnerCtrl = TextEditingController();
  final _privateKeyCtrl = TextEditingController();
  bool _obscureKey = true;

  Widget _buildInput(TextEditingController c, String hint,
      {bool isNumber = false}) {
    return Container(
      height: 50,
      margin: EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: Color(0xFF1A1A2E),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.white.withOpacity(0.08)),
      ),
      child: TextField(
        controller: c,
        style: TextStyle(color: Colors.white, fontSize: 14),
        keyboardType: isNumber ? TextInputType.number : TextInputType.text,
        decoration: InputDecoration(
          hintText: hint,
          hintStyle: TextStyle(color: Colors.white38, fontSize: 13),
          border: InputBorder.none,
          contentPadding: EdgeInsets.symmetric(horizontal: 14, vertical: 14),
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
              Icon(Icons.swap_horiz, color: Color(0xFFFF1744), size: 26),
              SizedBox(width: 10),
              Text('Transfer Ownership',
                  style: TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold)),
            ]).animate().fadeIn(duration: 500.ms).slideY(begin: -0.2),
            SizedBox(height: 6),
            Text(
              'Transfer land ownership securely on blockchain',
              style: TextStyle(color: Colors.white54, fontSize: 13),
            ).animate().fadeIn(delay: 100.ms),

            SizedBox(height: 28),

            // Transfer Card
            Container(
              padding: EdgeInsets.all(20),
              decoration: BoxDecoration(
                color: Color(0xFF111118),
                borderRadius: BorderRadius.circular(16),
                border: Border.all(color: Colors.white.withOpacity(0.08)),
              ),
              child: Column(children: [
                _buildInput(_landIdCtrl, 'Land ID (e.g. 1)', isNumber: true),
                _buildInput(_newOwnerCtrl, 'New Owner Wallet Address (0x...)'),

                // Private Key Section (yellow warning — exact React match)
                Container(
                  padding: EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Color(0xFF1A1400),
                    borderRadius: BorderRadius.circular(10),
                    border: Border.all(color: Colors.amber.withOpacity(0.3)),
                  ),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(children: [
                          Text('🔑', style: TextStyle(fontSize: 16)),
                          SizedBox(width: 8),
                          Text('Current Owner Private Key',
                              style: TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 14)),
                        ]),
                        SizedBox(height: 12),
                        Container(
                          height: 50,
                          decoration: BoxDecoration(
                            color: Color(0xFF1A1A2E),
                            borderRadius: BorderRadius.circular(10),
                            border: Border.all(
                                color: Colors.white.withOpacity(0.08)),
                          ),
                          child: TextField(
                            controller: _privateKeyCtrl,
                            obscureText: _obscureKey,
                            style: TextStyle(color: Colors.white, fontSize: 13),
                            decoration: InputDecoration(
                              hintText:
                                  '0x... (Your private key to sign transaction)',
                              hintStyle: TextStyle(
                                  color: Colors.white38, fontSize: 12),
                              border: InputBorder.none,
                              contentPadding: EdgeInsets.symmetric(
                                  horizontal: 14, vertical: 14),
                              suffixIcon: IconButton(
                                icon: Icon(
                                    _obscureKey
                                        ? Icons.visibility_off
                                        : Icons.visibility,
                                    color: Colors.white38,
                                    size: 18),
                                onPressed: () =>
                                    setState(() => _obscureKey = !_obscureKey),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(height: 10),
                        Row(children: [
                          Icon(Icons.warning_amber_rounded,
                              color: Colors.amber, size: 15),
                          SizedBox(width: 6),
                          Text('Never share your private key publicly',
                              style:
                                  TextStyle(color: Colors.amber, fontSize: 12)),
                        ]),
                      ]),
                ),

                SizedBox(height: 16),

                SizedBox(
                  width: double.infinity,
                  height: 52,
                  child: ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Color(0xFFFF1744),
                      foregroundColor: Colors.white,
                      shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(10)),
                      elevation: 0,
                    ),
                    child: Text('Transfer Ownership on Blockchain',
                        style: TextStyle(
                            fontWeight: FontWeight.bold, fontSize: 15)),
                  ),
                ),
              ]),
            ).animate().fadeIn(delay: 200.ms).slideY(begin: 0.2),
          ]),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _landIdCtrl.dispose();
    _newOwnerCtrl.dispose();
    _privateKeyCtrl.dispose();
    super.dispose();
  }
}
