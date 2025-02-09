import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, SafeAreaView, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import Colors from '../constants/Colors';

type PostProps = {
  username: string;
  userImage: string;
  postTime: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  shares: number;
  community?: {
    name: string;
    image: string;
  };
  taggedUsers?: {
    name: string;
    image: string;
  }[];
  postComments?: {
    username: string;
    userImage: string;
    comment: string;
    time: string;
  }[];
}

export default function Post({
  username = "Deniz Ayhan",
  userImage = "https://picsum.photos/50",
  postTime = "2 saat önce",
  content = "Bu bir örnek post içeriğidir.",
  imageUrl = "https://picsum.photos/400/300",
  likes = 123,
  comments = 45,
  shares = 12,
  community,
  taggedUsers = [],
  postComments = []
}: PostProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [localComments, setLocalComments] = useState(postComments);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      setLocalComments([
        {
          username: 'Ben',
          userImage: 'https://picsum.photos/53',
          comment: newComment,
          time: 'Şimdi'
        },
        ...localComments
      ]);
      setNewComment('');
    }
  };

  const handleProfilePress = (userName: string) => {
    router.push(`/profile/${userName}`);
  };

  return (
    <View style={[styles.container, { 
      backgroundColor: Colors.postBackground,
      shadowColor: Colors.text,
    }]}>
      {/* Post Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <TouchableOpacity onPress={() => handleProfilePress(username)}>
            <Image source={{ uri: userImage }} style={styles.userImage} />
          </TouchableOpacity>
          <View>
            <View style={styles.headerTextContainer}>
              <TouchableOpacity onPress={() => handleProfilePress(username)}>
                <Text style={[styles.username, { color: Colors.text }]}>{username}</Text>
              </TouchableOpacity>
              {community && (
                <>
                  <Text style={[styles.headerDot, { color: Colors.textSecondary }]}>•</Text>
                  <TouchableOpacity>
                    <Text style={[styles.communityName, { color: Colors.primary }]}>{community.name}</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
            <View style={styles.postMetaContainer}>
              <Text style={[styles.postTime, { color: Colors.textSecondary }]}>{postTime}</Text>
              {taggedUsers.length > 0 && (
                <Text style={[styles.taggedUsers, { color: Colors.textSecondary }]}>
                  {taggedUsers.map(user => user.name).join(', ')} ile birlikte
                </Text>
              )}
            </View>
          </View>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={20} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Post Content */}
      <Text style={[styles.content, { color: Colors.text }]}>{content}</Text>
      {imageUrl && (
        <Image source={{ uri: imageUrl }} style={styles.postImage} />
      )}

      {/* Post Stats */}
      <View style={[styles.stats, { borderBottomColor: Colors.border }]}>
        <View style={styles.statsLeft}>
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={16} 
            color={isLiked ? Colors.primary : Colors.textSecondary} 
          />
          <Text style={[styles.statsText, { color: Colors.textSecondary }]}>{likesCount}</Text>
        </View>
        <View style={styles.statsRight}>
          <TouchableOpacity onPress={() => setShowComments(true)}>
            <Text style={[styles.statsText, { color: Colors.textSecondary }]}>{localComments.length} yorum</Text>
          </TouchableOpacity>
          <Text style={[styles.statsText, { color: Colors.textSecondary }]}>{shares} paylaşım</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
          <Ionicons 
            name={isLiked ? "heart" : "heart-outline"} 
            size={24} 
            color={isLiked ? Colors.primary : Colors.textSecondary} 
          />
          <Text style={[
            styles.actionText, 
            { color: isLiked ? Colors.primary : Colors.textSecondary }
          ]}>Beğen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => setShowComments(true)}>
          <Ionicons name="chatbubble-outline" size={24} color={Colors.textSecondary} />
          <Text style={[styles.actionText, { color: Colors.textSecondary }]}>Yorum Yap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="share-outline" size={24} color={Colors.textSecondary} />
          <Text style={[styles.actionText, { color: Colors.textSecondary }]}>Paylaş</Text>
        </TouchableOpacity>
      </View>

      {/* Comments Modal */}
      <Modal
        visible={showComments}
        animationType="slide"
        onRequestClose={() => setShowComments(false)}
      >
        <SafeAreaView style={[styles.modalContainer, { backgroundColor: Colors.background }]}>
          <View style={[styles.modalHeader, { 
            borderBottomColor: Colors.border,
            backgroundColor: Colors.background 
          }]}>
            <TouchableOpacity onPress={() => setShowComments(false)}>
              <Ionicons name="close" size={24} color={Colors.textSecondary} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: Colors.text }]}>Yorumlar</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView style={[styles.commentsList, { backgroundColor: Colors.background }]}>
            {localComments.map((comment, index) => (
              <View key={index} style={[styles.commentItem, { 
                borderBottomColor: Colors.border,
                backgroundColor: Colors.background 
              }]}>
                <Image source={{ uri: comment.userImage }} style={styles.commentUserImage} />
                <View style={styles.commentContent}>
                  <Text style={[styles.commentUsername, { color: Colors.text }]}>{comment.username}</Text>
                  <Text style={[styles.commentText, { color: Colors.text }]}>{comment.comment}</Text>
                  <Text style={[styles.commentTime, { color: Colors.textSecondary }]}>{comment.time}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={[styles.commentInput, { 
            borderTopColor: Colors.border,
            backgroundColor: Colors.background 
          }]}>
            <TextInput
              style={[styles.input, { 
                backgroundColor: Colors.surfaceLight,
                color: Colors.text 
              }]}
              placeholder="Yorum yaz..."
              placeholderTextColor={Colors.textSecondary}
              value={newComment}
              onChangeText={setNewComment}
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton} 
              onPress={handleComment}
              disabled={!newComment.trim()}
            >
              <Ionicons 
                name="send" 
                size={24} 
                color={newComment.trim() ? Colors.primary : Colors.textSecondary} 
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.postBackground,
    marginVertical: 1,
    shadowColor: Colors.text,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  postTime: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    padding: 12,
    fontSize: 14,
    lineHeight: 20,
  },
  postImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statsLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsRight: {
    flexDirection: 'row',
    gap: 10,
  },
  statsText: {
    color: '#666',
    marginLeft: 5,
    fontSize: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  actionText: {
    color: '#666',
    marginLeft: 4,
    fontSize: 14,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerDot: {
    marginHorizontal: 5,
    color: '#666',
  },
  communityName: {
    color: '#2196F3',
    fontWeight: '500',
  },
  postMetaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taggedUsers: {
    color: '#666',
    fontSize: 12,
    marginLeft: 5,
  },
  actionTextActive: {
    color: '#2196F3',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: 'white',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  commentsList: {
    flex: 1,
    backgroundColor: 'white',
  },
  commentItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  commentUserImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  commentText: {
    fontSize: 14,
    marginBottom: 2,
  },
  commentTime: {
    fontSize: 12,
    color: '#666',
  },
  commentInput: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    padding: 8,
  },
});
