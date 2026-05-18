import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_animate/flutter_animate.dart';
import '../providers/land_provider.dart';

class HomeScreen extends StatefulWidget {
  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final TextEditingController _searchController = TextEditingController();

  Widget _buildInput(TextEditingController c, String hint,
      {bool isNumber = false}) {
    return Container(
      height: 50,
      decoration: BoxDecoration(
        color: Color(0xFF1A1A2E),
        borderRadius: BorderRadius.circular(10),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
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
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Top Bar
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Row(children: [
                    Container(
                      width: 32,
                      height: 32,
                      decoration: BoxDecoration(
                        gradient: LinearGradient(
                            colors: [Color(0xFF9C27B0), Color(0xFFE91E63)]),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child:
                          Icon(Icons.landscape, color: Colors.white, size: 18),
                    ),
                    SizedBox(width: 8),
                    RichText(
                      text: TextSpan(children: [
                        TextSpan(
                            text: 'Block ',
                            style: TextStyle(
                                color: Colors.white,
                                fontWeight: FontWeight.bold,
                                fontSize: 18)),
                        TextSpan(
                            text: 'Land',
                            style: TextStyle(
                                color: Color(0xFFFF1744),
                                fontWeight: FontWeight.bold,
                                fontSize: 18)),
                      ]),
                    ),
                  ]),
                  Container(
                    padding: EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: Colors.green.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: Colors.green.withOpacity(0.4)),
                    ),
                    child: Row(children: [
                      Container(
                          width: 7,
                          height: 7,
                          decoration: BoxDecoration(
                              color: Colors.green, shape: BoxShape.circle)),
                      SizedBox(width: 5),
                      Text('Live',
                          style: TextStyle(color: Colors.green, fontSize: 12)),
                    ]),
                  ),
                ],
              ).animate().fadeIn(duration: 500.ms),

              SizedBox(height: 24),

              // Hero Glass Card
              Consumer<LandProvider>(builder: (context, provider, _) {
                return Container(
                  width: double.infinity,
                  padding: EdgeInsets.all(28),
                  decoration: BoxDecoration(
                    color: Color(0xFF111118),
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: Colors.white.withOpacity(0.08)),
                  ),
                  child: Column(
                    children: [
                      // Ethereum Badge
                      Container(
                        padding:
                            EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                        decoration: BoxDecoration(
                          color: Color(0xFF1A1A2E),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                              color: Color(0xFF3D5AF1).withOpacity(0.5)),
                        ),
                        child: Row(mainAxisSize: MainAxisSize.min, children: [
                          Icon(Icons.link, color: Color(0xFF3D5AF1), size: 14),
                          SizedBox(width: 6),
                          Text('Secured by Ethereum Blockchain',
                              style: TextStyle(
                                  color: Colors.white70, fontSize: 11)),
                          SizedBox(width: 6),
                          Container(
                              width: 7,
                              height: 7,
                              decoration: BoxDecoration(
                                  color: Colors.green, shape: BoxShape.circle)),
                        ]),
                      ).animate().fadeIn(duration: 500.ms),

                      SizedBox(height: 24),

                      // "Land Registry" white
                      Text(
                        'Land Registry',
                        style: TextStyle(
                            fontSize: 40,
                            fontWeight: FontWeight.w900,
                            color: Colors.white,
                            height: 1.1),
                        textAlign: TextAlign.center,
                      )
                          .animate()
                          .fadeIn(delay: 200.ms)
                          .slideY(begin: 0.3, duration: 600.ms),

                      // "Without Fraud" gradient
                      ShaderMask(
                        shaderCallback: (bounds) => LinearGradient(
                          colors: [Color(0xFFFF1744), Color(0xFF00BFA5)],
                        ).createShader(bounds),
                        child: Text(
                          'Without Fraud',
                          style: TextStyle(
                              fontSize: 40,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                              height: 1.1),
                          textAlign: TextAlign.center,
                        ),
                      )
                          .animate()
                          .fadeIn(delay: 300.ms)
                          .slideY(begin: 0.3, duration: 600.ms),

                      SizedBox(height: 14),

                      Text(
                        'Immutable, transparent land records for Uttarakhand.\nPowered by blockchain — owned by citizens.',
                        style: TextStyle(
                            color: Colors.white54, fontSize: 13, height: 1.6),
                        textAlign: TextAlign.center,
                      ).animate().fadeIn(delay: 400.ms),

                      SizedBox(height: 24),

                      // Stats Row
                      Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          _buildStat('100%', 'TAMPER-PROOF'),
                          SizedBox(width: 28),
                          _buildStat('0sec', 'VERIFY TIME'),
                          SizedBox(width: 28),
                          _buildStat('∞', 'RECORDS'),
                        ],
                      ).animate().fadeIn(delay: 500.ms),

                      SizedBox(height: 24),

                      // Search + Verify
                      Row(children: [
                        Expanded(
                          child: Container(
                            height: 52,
                            decoration: BoxDecoration(
                              color: Color(0xFF1A1A2E),
                              borderRadius: BorderRadius.circular(12),
                              border: Border.all(
                                  color: Colors.white.withOpacity(0.1)),
                            ),
                            child: TextField(
                              controller: _searchController,
                              style:
                                  TextStyle(color: Colors.white, fontSize: 14),
                              keyboardType: TextInputType.number,
                              decoration: InputDecoration(
                                hintText:
                                    'Enter Land ID to verify ownership...',
                                hintStyle: TextStyle(
                                    color: Colors.white38, fontSize: 13),
                                prefixIcon: Icon(Icons.search,
                                    color: Colors.white38, size: 18),
                                border: InputBorder.none,
                                contentPadding:
                                    EdgeInsets.symmetric(vertical: 16),
                              ),
                            ),
                          ),
                        ),
                        SizedBox(width: 10),
                        GestureDetector(
                          onTap: () {
                            final id = int.tryParse(_searchController.text);
                            if (id != null) provider.fetchLand(id);
                          },
                          child: Container(
                            height: 52,
                            padding: EdgeInsets.symmetric(horizontal: 18),
                            decoration: BoxDecoration(
                              gradient: LinearGradient(colors: [
                                Color(0xFFFF1744),
                                Color(0xFFD50000)
                              ]),
                              borderRadius: BorderRadius.circular(12),
                            ),
                            child: Row(children: [
                              Text('Verify',
                                  style: TextStyle(
                                      color: Colors.white,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 15)),
                              SizedBox(width: 6),
                              Icon(Icons.arrow_forward,
                                  color: Colors.white, size: 16),
                            ]),
                          ),
                        ),
                      ]).animate().fadeIn(delay: 600.ms),

                      // Loading
                      if (provider.isLoading) ...[
                        SizedBox(height: 20),
                        CircularProgressIndicator(
                            valueColor:
                                AlwaysStoppedAnimation(Color(0xFFFF1744))),
                      ],

                      // Error
                      if (provider.error != null) ...[
                        SizedBox(height: 14),
                        Container(
                          padding: EdgeInsets.all(14),
                          decoration: BoxDecoration(
                            color: Colors.red.withOpacity(0.1),
                            borderRadius: BorderRadius.circular(10),
                            border:
                                Border.all(color: Colors.red.withOpacity(0.3)),
                          ),
                          child: Row(children: [
                            Icon(Icons.error_outline,
                                color: Colors.red, size: 18),
                            SizedBox(width: 10),
                            Expanded(
                                child: Text(provider.error!,
                                    style: TextStyle(
                                        color: Colors.red, fontSize: 13))),
                          ]),
                        ).animate().shake(duration: 400.ms),
                      ],

                      // Land Result
                      if (provider.lands.isNotEmpty) ...[
                        SizedBox(height: 14),
                        Container(
                          padding: EdgeInsets.all(16),
                          decoration: BoxDecoration(
                            color: Colors.green.withOpacity(0.08),
                            borderRadius: BorderRadius.circular(12),
                            border: Border.all(
                                color: Colors.green.withOpacity(0.3)),
                          ),
                          child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(children: [
                                  Icon(
                                    provider.lands.first.isDisputed
                                        ? Icons.warning
                                        : Icons.verified,
                                    color: provider.lands.first.isDisputed
                                        ? Colors.orange
                                        : Colors.green,
                                  ),
                                  SizedBox(width: 8),
                                  Text(provider.lands.first.khasraNumber,
                                      style: TextStyle(
                                          color: Colors.white,
                                          fontWeight: FontWeight.bold,
                                          fontSize: 18)),
                                ]),
                                SizedBox(height: 8),
                                Text(provider.lands.first.location,
                                    style: TextStyle(color: Colors.white70)),
                                Text('${provider.lands.first.areaSqFt} sq ft',
                                    style: TextStyle(color: Colors.white60)),
                                SizedBox(height: 6),
                                Text(provider.lands.first.ownerAddress,
                                    style: TextStyle(
                                        color: Colors.white38, fontSize: 11)),
                              ]),
                        ).animate().fadeIn().scale(
                            begin: Offset(0.95, 0.95), end: Offset(1.0, 1.0)),
                      ],
                    ],
                  ),
                );
              }),

              SizedBox(height: 40),

              // Why BlockLand
              Text(
                'Why BlockLand?',
                style: TextStyle(
                    color: Colors.white,
                    fontSize: 22,
                    fontWeight: FontWeight.bold),
              ).animate().fadeIn(),

              SizedBox(height: 20),

              GridView.count(
                crossAxisCount: 2,
                shrinkWrap: true,
                physics: NeverScrollableScrollPhysics(),
                crossAxisSpacing: 12,
                mainAxisSpacing: 12,
                childAspectRatio: 1.1,
                children: [
                  _buildFeatureCard(
                      Icons.lock,
                      'Immutable Records',
                      'Every land record is permanently secured on Ethereum blockchain',
                      Color(0xFFFF1744)),
                  _buildFeatureCard(
                      Icons.history,
                      'Full Ownership Trail',
                      'Complete transaction history from day one, fully auditable',
                      Color(0xFF3D5AF1)),
                  _buildFeatureCard(
                      Icons.balance,
                      'Dispute Management',
                      'Real-time legal dispute flags protect citizens from fraud',
                      Color(0xFF00BFA5)),
                  _buildFeatureCard(
                      Icons.public,
                      'Open Verification',
                      'Anyone can instantly verify ownership without authority',
                      Color(0xFFFFB300)),
                ],
              ),
              SizedBox(height: 20),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildStat(String value, String label) {
    return Column(children: [
      Text(value,
          style: TextStyle(
              color: Color(0xFFFF1744),
              fontSize: 22,
              fontWeight: FontWeight.bold)),
      Text(label,
          style: TextStyle(
              color: Colors.white38, fontSize: 9, letterSpacing: 0.5)),
    ]);
  }

  Widget _buildFeatureCard(
      IconData icon, String title, String desc, Color color) {
    return Container(
      padding: EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: Color(0xFF111118),
        borderRadius: BorderRadius.circular(14),
        border: Border(top: BorderSide(color: color, width: 2)),
      ),
      child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [
        Icon(icon, color: color, size: 26),
        SizedBox(height: 10),
        Text(title,
            style: TextStyle(
                color: Colors.white,
                fontWeight: FontWeight.bold,
                fontSize: 12)),
        SizedBox(height: 6),
        Expanded(
          child: Text(desc,
              style: TextStyle(color: Colors.white54, fontSize: 11),
              overflow: TextOverflow.fade),
        ),
      ]),
    ).animate().fadeIn(delay: 300.ms).slideY(begin: 0.2);
  }

  @override
  void dispose() {
    _searchController.dispose();
    super.dispose();
  }
}
