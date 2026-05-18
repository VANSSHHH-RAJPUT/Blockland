import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'providers/land_provider.dart';
import 'screens/main_screen.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => LandProvider(),
      child: BlockLandApp(),
    ),
  );
}

class BlockLandApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BlockLand',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark().copyWith(
        scaffoldBackgroundColor: Color(0xFF0A0A0F),
        useMaterial3: true,
      ),
      home: MainScreen(),
    );
  }
}
