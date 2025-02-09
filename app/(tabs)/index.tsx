import { StyleSheet, View, ScrollView } from 'react-native';
import Post from '../../components/Post';
import Colors from '../../constants/Colors';

const SAMPLE_COMMENTS = [
  {
    username: "Mehmet Yılmaz",
    userImage: "https://picsum.photos/54",
    comment: "Harika görünüyor! 👏",
    time: "1 saat önce"
  },
  {
    username: "Ayşe Kaya",
    userImage: "https://picsum.photos/55",
    comment: "Çok güzel! ❤️",
    time: "2 saat önce"
  }
];

export default function TabOneScreen() {
  return (
    <ScrollView style={styles.container}>
      <Post 
        username="Deniz Ayhan"
        userImage="https://picsum.photos/50"
        postTime="2 saat önce"
        content="Bugün harika bir gün! 🌞"
        imageUrl="https://picsum.photos/400/300"
        likes={245}
        comments={23}
        shares={5}
        community={{
          name: "Gezginler Kulübü",
          image: "https://picsum.photos/60"
        }}
        postComments={SAMPLE_COMMENTS}
      />
      <Post 
        username="Ahmet Yılmaz"
        userImage="https://picsum.photos/51"
        postTime="5 saat önce"
        content="Yeni projem üzerinde çalışıyorum. React Native harika! 💻"
        likes={182}
        comments={15}
        shares={3}
        taggedUsers={[
          { name: "Mehmet Demir", image: "https://picsum.photos/56" },
          { name: "Ali Yıldız", image: "https://picsum.photos/57" }
        ]}
        postComments={SAMPLE_COMMENTS}
      />
      <Post 
        username="Ayşe Demir"
        userImage="https://picsum.photos/52"
        postTime="8 saat önce"
        content="Güzel bir tatil günü... 🏖️"
        imageUrl="https://picsum.photos/400/301"
        likes={543}
        comments={42}
        shares={12}
        community={{
          name: "Tatilciler",
          image: "https://picsum.photos/61"
        }}
        taggedUsers={[
          { name: "Can Yılmaz", image: "https://picsum.photos/58" }
        ]}
        postComments={SAMPLE_COMMENTS}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingVertical: 0,
  },
});
