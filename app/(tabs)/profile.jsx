import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const leaderboardData = [
  { id: 1, name: 'Angela Mendoza', points: 29, avatar: require('../../assets/images/profilesample.png') },
  { id: 2, name: 'Mike Enriquez', points: 25, avatar: require('../../assets/images/profilesample.png') },
  { id: 3, name: 'Nico Loreto', points: 21, avatar: require('../../assets/images/profilesample.png') },
  { id: 4, name: 'Marguerite Maximo', points: 16, avatar: require('../../assets/images/profilesample.png') },
];

const categories = [
  { id: 1, name: 'Coding', points: 15 },
  { id: 2, name: 'Digital Literacy', points: 10 },
];

export default function Profile() {
  const userPoints = categories.reduce((total, category) => total + category.points, 0);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'transparent' }}>
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <View style={styles.headerRow}>
              <TouchableOpacity style={{ padding: 12, marginLeft: -8 }}>
                <Ionicons name="chevron-back" size={28} color="darkslateblue" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Your Profile</Text>
              <TouchableOpacity style={{ padding: 12, marginRight: -8 }}>
                <Ionicons name="notifications-outline" size={28} color="darkslateblue" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <ScrollView 
          style={styles.scrollView} 
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Profile Card */}
            <View style={styles.profileRow}>
              <View style={styles.avatarContainer}>
                <View style={styles.avatarWrapper}>
                  <Image
                    source={require('../../assets/images/profilesample.png')}
                    style={styles.avatar}
                  />
                  <TouchableOpacity style={styles.cameraBtn}>
                    <Image 
                      source={require('../../assets/images/cameraIcon.png')}
                      style={styles.cameraIcon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.name}>Mike Enriquez</Text>
                <Text style={styles.level}>Level 5</Text>
                <Text style={styles.pointsChange}>+5 points this week</Text>
              </View>
            </View>

            {/* Points Card */}
            <View style={[styles.card, styles.pointsContent]}>
              <Text style={styles.cardTitle}>Your Points</Text>
              
              <View style={styles.pointsSection}>
                {/* Progress Circle */}
                <View style={styles.progressCircle}>
                  <Text style={styles.pointsValue}>{userPoints}</Text>
                  <Text style={styles.pointsLabel}>points</Text>
                </View>

                {/* Categories */}
                <View style={styles.categories}>
                  {categories.map(category => (
                    <View key={category.id} style={styles.category}>
                      <View 
                        style={[
                          styles.categoryDot, 
                          { backgroundColor: category.id === 1 ? '#7B4AE2' : '#FFB800' }
                        ]} 
                      />
                      <Text style={styles.categoryText}>{category.name}</Text>
                    </View>
                  ))}
                </View>
              </View>

              {/* Badges Section */}
              <View style={styles.badgesSection}>
                <View style={styles.badgeRow}>
                  <View style={styles.badgeContainer}>
                    {/*<HexagonBadge size={48} color="#7B4AE2" isActive={true} />*/}
                    <Image source={require('../../assets/images/badge_first.png')} style={styles.badgeImage} />
                    <Text style={styles.badgeLabel}>First Step</Text>
                  </View>
                  <View style={styles.badgeConnector} />
                  <View style={styles.badgeContainer}>
                    {/*<HexagonBadge size={48} color="#FFB800" isActive={true} />*/}
                    <Image source={require('../../assets/images/badge_digitalwarrior.png')} style={styles.badgeImage} />

                    <Text style={styles.badgeLabel}>DIGITAL</Text>
                  </View>
                  <View style={styles.badgeConnector} />
                  <View style={styles.badgeContainer}>
                    {/*<HexagonBadge size={48} color="#FF4B55" isActive={false} />*/}
                    <Image source={require('../../assets/images/badge_htmlhero.png')} style={styles.badgeImage} />
                    <Text style={styles.badgeLabel}>SOCIAL</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Leaderboard Card */}
            <View style={styles.card}>
              <View style={styles.leaderboardHeader}>
                <Text style={styles.cardTitle}>Local Rank</Text>
                <View style={styles.locationContainer}>
                  <Text style={styles.locationText}>Valencia, Negros Oriental, Philippines</Text>
                  <TouchableOpacity>
                    <Ionicons name="location-outline" size={20} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
              {leaderboardData.map((user, index) => (
                <View key={user.id} style={[
                  styles.leaderboardRow,
                  index === leaderboardData.length - 1 && { borderBottomWidth: 0 }
                ]}>
                  <View style={styles.leaderboardUser}>
                    <Image source={user.avatar} style={styles.leaderboardAvatar} />
                    <View>
                      <Text style={styles.leaderboardName}>{user.name}</Text>
                      <Text style={styles.userHandle}>@codermike</Text>
                    </View>
                  </View>
                  <Text style={styles.leaderboardPoints}>{user.points}</Text>
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 80, // Reduced from 100 to 80
    width: '100%',
    backgroundColor: '#ffffffff', // Changed to purple-tinted dark color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 16, // Reduced padding
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20, // Reduced from 24 to 20
    fontWeight: '700',
    color: 'darkslateblue',
    letterSpacing: 0.5,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  profileRow: {
    backgroundColor: '#2D1B69', // Updated to match header
    marginHorizontal: -16,
    marginTop: -20,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
    padding: 24,
    paddingBottom: 48, // Increased padding at bottom for overlap
    marginBottom: -24, // Negative margin to create overlap
  },
  avatarContainer: {
    marginBottom: 8,
    alignItems: 'center',
  },
  avatarWrapper: {
    marginTop: 15, 
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#3D2B79', // Lighter purple-tinted dark
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    borderWidth: 2,
    borderColor: '#7B4AE2',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  cameraBtn: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#68509cff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  cameraIcon: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  profileInfo: {
    alignItems: 'center',
    gap: 4,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  level: {
    fontSize: 15,
    color: '#CCCCCC',
    letterSpacing: 0.3,
  },
  pointsChange: {
    fontSize: 13,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 4,
    letterSpacing: 0.2,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 24,
    marginBottom: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 3,
    position: 'relative', // Added for proper shadow rendering
    zIndex: 1, // Added to ensure proper layering
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  checkIcon: {
    width: 24,
    height: 24,
    tintColor: '#4CAF50',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  pointsContent: {
    marginBottom: 24,
  },
  pointsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  progressCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#7b4ae2ff',
    shadowColor: '#7B4AE2',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  pointsText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  categories: {
    flex: 1,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  categoryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#4A4A4A',
    letterSpacing: 0.3,
  },
  achievementsSection: {
    alignItems: 'center',
    flexDirection: 'column',
    gap: 16,
  },
  badgeContainer: {
    alignItems: 'center',
    gap: 8,
  },
  badgeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4A4A4A',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  badgesSection: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  badgeRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
  },
  badgeConnector: {
    width: 24,
    height: 2,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 6,
  },
  leaderboardHeader: {
    marginBottom: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
    backgroundColor: '#F8F9FA',
    padding: 8,
    borderRadius: 12,
  },
  locationText: {
    fontSize: 13,
    color: '#666',
    letterSpacing: 0.2,
  },
  leaderboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  leaderboardUser: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  leaderboardAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#F0F0F0',
  },
  leaderboardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    letterSpacing: 0.3,
  },
  userHandle: {
    fontSize: 13,
    color: '#666',
    letterSpacing: 0.2,
  },
  leaderboardPoints: {
    fontSize: 18,
    fontWeight: '700',
    color: '#7B4AE2',
    letterSpacing: 0.5,
  },
  profileBadges: {
    paddingHorizontal: 16,
  },
  badgeImage: {
    resizeMode: 'contain',
    width: 48,
    height: 48,
  },
});
