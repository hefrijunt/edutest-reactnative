import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const varkQuestions = [
  {
    question: 'Saya ingin mendatangi satu toko yang disarankan teman. Saya akan:',
    options: [
      'mencari toko itu berdasarkan tempat lain di sekitar situ yang sudah saya tahu.',
      'bertanya pada teman yang tahu arah toko itu.',
      'menuliskan alamat lengkap dan daftar belokan yang harus saya ingat.',
      'menggunakan peta yang menunjukkan lokasi toko itu.',
    ],
  },
  {
    question: 'Suatu situs internet memiliki video mengenai cara membuat suatu grafik khusus. Di situs itu ada orang yang bicara, ada daftar langkah pembuatan video, dan ada beberapa diagram. Saya paling mengerti isi situs itu dengan cara:',
    options: [
      'mengamati diagram petunjuknya.',
      'mendengar suara yang menjelaskan.',
      'membaca instruksi yang tertulis.',
      'melihat tindakan orangnya.',
    ],
  },
  {
    question: 'Saya ingin mengetahui lebih dalam mengenai suatu tur wisata yang saya rencanakan. Saya akan:',
    options: [
      'melihat detail kegiatan dan aktivitas yang akan dilakukan.',
      'melihat petanya dan mengamati lokasi-lokasi turnya.',
      'membaca perincian jadwal kegiatan tur tersebut.',
      'bicara dengan pengelola atau peserta lain di tur itu.',
    ],
  },
  {
    question: 'Dalam memilih karir atau jurusan pendidikan, yang penting bagi saya adalah:',
    options: [
      'aplikasi ilmu pada kondisi nyata yang dihadapi.',
      'berkomunikasi dengan orang dengan berdiskusi.',
      'pekerjaan yang memakai desain, peta, atau bagan.',
      'penggunaan kata yang tepat dalam komunikasi tertulis.',
    ],
  },
  {
    question: 'Saat belajar, saya:',
    options: [
      'belajar dengan berdiskusi.',
      'mencari pola tertentu.',
      'menggunakan contoh dan penerapan.',
      'membaca buku, artikel dan diktat.',
    ],
  },
  {
    question: 'Saya ingin menabung lebih banyak dan mempertimbangkan beberapa cara. Saya akan:',
    options: [
      'mempertimbangkan contoh dari setiap cara penghematan berdasarkan kondisi keuangan saya.',
      'membaca brosur tertulis yang menjelaskan cara-cara berhemat secara detail.',
      'memakai grafik yang menunjukkan variasi pilihan dan jangka waktu yang dibutuhkan.',
      'bicara dengan ahli keuangan mengenai cara-cara berhemat yang bisa ditempuh.',
    ],
  },
  {
    question: 'Saya ingin mempelajari suatu jenis permainan kartu yang baru. Saya akan:',
    options: [
      'melihat orang lain bermain sebelum saya ikut mencoba.',
      'mendengar penjelasan orang serta bertanya padanya.',
      'memakai diagram yang menjelaskan tahap, langkah dan strategi permainannya.',
      'membaca petunjuk tertulis pada permainan itu.',
    ],
  },
  {
    question: 'Saya mempunyai masalah jantung. Saya lebih suka dokter yang:',
    options: [
      'memberikan bacaan mengenai masalah yang saya hadapi.',
      'memakai alat peraga jantung untuk menunjukkan masalah yang saya hadapi.',
      'menguraikan masalah yang saya hadapi.',
      'menunjukkan diagram mengenai masalah yang saya hadapi.',
    ],
  },
  {
    question: 'Saya ingin mempelajari suatu program baru di komputer. Saya akan:',
    options: [
      'membaca instruksi tertulis pada petunjuknya.',
      'bicara dengan orang yang paham tentang program itu.',
      'langsung mencoba dan belajar dari kesalahan.',
      'mengikuti diagram pada buku petunjuknya.',
    ],
  },
  {
    question: 'Ketika belajar sesuatu dari internet, saya menyukai:',
    options: [
      'video cara melakukan atau membuat sesuatu.',
      'desain dan fitur visual yang menarik.',
      'uraian tertulis, daftar dan penjelasan yang menarik.',
      'situs dengan suara, siaran internet atau wawancara.',
    ],
  },
  {
    question: 'Saya ingin mempelajari suatu proyek kerja yang baru. Saya akan meminta:',
    options: [
      'diagram yang berisi tahap-tahap proyek itu lengkap dengan bagan berisi manfaat dan biayanya.',
      'laporan tertulis yang menjelaskan bagian utama proyek tersebut.',
      'kesempatan berdiskusi mengenai proyek tersebut.',
      'contoh-contoh proyek serupa yang sudah berhasil.',
    ],
  },
  {
    question: 'Saya ingin belajar cara memotret dengan lebih baik. Saya akan:',
    options: [
      'bertanya dan berdiskusi mengenai kamera dan fiturnya.',
      'membaca instruksi tertulis mengenai cara pemakaian kamera itu.',
      'melihat diagram yang menunjukkan komponen kamera itu.',
      'melihat contoh hasil yang baik dan yang jelek dari kamera itu.',
    ],
  },
  {
    question: 'Saya lebih suka pembicara yang dalam presentasinya menggunakan:',
    options: [
      'peragaan, model peraga, atau kesempatan mencoba langsung.',
      'kesempatan tanya jawab, diskusi kelompok atau pembicara tamu.',
      'cetakan diktat, buku atau bacaan lain.',
      'diagram, bagan, peta atau grafik.',
    ],
  },
  {
    question: 'Saya baru saja menyelesaikan suatu lomba atau suatu ujian dan saya ingin umpan balik orang lain. Saya mengharapkan:',
    options: [
      'umpan balik yang berisi contoh-contoh dari yang saya kerjakan.',
      'umpan balik berupa penjelasan tertulis mengenai hasil pekerjaan saya.',
      'umpan balik yang disampaikan langsung kepada saya.',
      'umpan balik dalam bentuk grafik mengenai hasil pekerjaan saya.',
    ],
  },
  {
    question: 'Saya tertarik dengan suatu rumah atau apartemen. Sebelum berkunjung, saya ingin:',
    options: [
      'melihat video rumah atau apartemen itu.',
      'berdiskusi dengan pemiliknya.',
      'keterangan tertulis mengenai kamar-kamar dan fiturnya.',
      'denah ruangan dan peta area sekitarnya.',
    ],
  },
  {
    question: 'Saya ingin merakit satu set meja kayu yang belum jadi. Saya paling mengerti jika:',
    options: [
      'mengikuti diagram instruksi yang dilampirkan.',
      'mendengar saran dari orang yang pernah merakitnya.',
      'membaca penjelasan tertulis yang dilampirkan.',
      'menonton video orang merakit meja yang serupa.',
    ],
  },
];


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    padding: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 12,
    color: '#0B0B34',
    flex: 1,
  },
  // Intro styles
  introContainer: {
    padding: 24,
  },
  testCard: {
    backgroundColor: '#4B79FF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  testTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  stepNumber: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4B79FF',
  },
  stepText: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
  },
  stepIcon: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  arrowIcon: {
    color: '#fff',
    fontSize: 20,
  },
  varkCard: {
    backgroundColor: '#FF9500',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  varkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  varkIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  varkIcon: {
    fontSize: 24,
    color: '#fff',
  },
  varkText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
    marginBottom: 8,
  },
  startButton: {
    backgroundColor: '#4B79FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  // Quiz styles
  quizContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0B0B34',
    marginBottom: 20,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
    color: '#0B0B34',
    lineHeight: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F6',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  bubble: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4B79FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  bubbleSelected: {
    backgroundColor: '#4B79FF',
  },
  bubbleDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4B79FF',
  },
  optionText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  nextButton: {
    backgroundColor: '#4B79FF',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButtonDisabled: {
    backgroundColor: '#D1D5DB',
  },
  nextButtonTextDisabled: {
    color: '#9CA3AF',
  },
  // Result styles
  resultContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#0B0B34',
  },
  resultText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  recommendation: {
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  recommendationText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default function PriorKnowledge() {
  const router = useRouter();
  const [screen, setScreen] = useState<'intro' | 'quiz' | 'result'>('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [scores, setScores] = useState({ V: 0, A: 0, R: 0, K: 0 });
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleStartQuiz = () => {
    setScreen('quiz');
    setCurrentQuestion(0);
    setAnswers([]);
    setScores({ V: 0, A: 0, R: 0, K: 0 });
    setSelectedOption(null);
  };

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
  };

  const handleNext = () => {
    if (selectedOption === null) return;

    const newAnswers = [...answers, selectedOption];
    setAnswers(newAnswers);

    if (currentQuestion < varkQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      // Calculate scores
      let v = 0, a = 0, r = 0, k = 0;
      const styles = ['V', 'A', 'R', 'K'];
      newAnswers.forEach(ans => {
        if (styles[ans] === 'V') v++;
        else if (styles[ans] === 'A') a++;
        else if (styles[ans] === 'R') r++;
        else if (styles[ans] === 'K') k++;
      });
      setScores({ V: v, A: a, R: r, K: k });
      setScreen('result');
    }
  };

  const getDominantStyle = () => {
    const maxScore = Math.max(scores.V, scores.A, scores.R, scores.K);
    if (scores.V === maxScore) return 'Visual';
    if (scores.A === maxScore) return 'Aural';
    if (scores.R === maxScore) return 'Read/Write';
    return 'Kinesthetic';
  };

  const getRecommendation = (style: string) => {
    const recs = {
      Visual: 'Rekomendasi strategi belajar: Gunakan diagram dan video.',
      Aural: 'Rekomendasi strategi belajar: Dengarkan penjelasan dan diskusi.',
      'Read/Write': 'Rekomendasi strategi belajar: Baca teks dan tulis catatan.',
      Kinesthetic: 'Rekomendasi strategi belajar: Lakukan praktik dan simulasi.',
    };
    return recs[style as keyof typeof recs] || '';
  };

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>
      <Text style={styles.title}>Prior Knowledge</Text>
    </View>
  );

  if (screen === 'intro') {
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <ScrollView style={styles.introContainer}>
          {/* Test Prior Knowledge Card */}
          <View style={styles.testCard}>
            <Text style={styles.testTitle}>Test Prior Knowledge</Text>
            <View style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>1</Text>
              </View>
              <Text style={styles.stepText}>Getting to know your data</Text>
              <Ionicons name="cloud-upload-outline" style={styles.stepIcon} />
            </View>
            <View style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>2</Text>
              </View>
              <Text style={styles.stepText}>Mining frequent patterns</Text>
              <Ionicons name="trending-up-outline" style={styles.stepIcon} />
            </View>
            <View style={styles.stepContainer}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>3</Text>
              </View>
              <Text style={styles.stepText}>Classification patterns</Text>
              <Ionicons name="bar-chart-outline" style={styles.stepIcon} />
            </View>
            <Ionicons name="chevron-forward" style={styles.arrowIcon} />
          </View>

          {/* VARK Card */}
          <View style={styles.varkCard}>
            <Text style={styles.varkTitle}>VARK Styles of Learning</Text>
            <View style={styles.varkIcons}>
              <Ionicons name="eye-outline" style={styles.varkIcon} />
              <Ionicons name="volume-high-outline" style={styles.varkIcon} />
              <Ionicons name="book-outline" style={styles.varkIcon} />
              <Ionicons name="hand-right-outline" style={styles.varkIcon} />
            </View>
            <Text style={styles.varkText}>Hasil deteksi gaya belajar anda:{'\n'}</Text>
            <Text style={styles.varkText}>Visual</Text>
            <Text style={styles.varkText}>Rekomendasi strategi belajar visual seperti diagram dan video.</Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={handleStartQuiz}>
            <Text style={styles.startButtonText}>Mulai Test</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (screen === 'quiz') {
    const question = varkQuestions[currentQuestion];
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.quizContainer}>
          <View>
            <Text style={styles.progressText}>
              Pertanyaan {currentQuestion + 1}/{varkQuestions.length}
            </Text>
            <Text style={styles.questionText}>{question.question}</Text>
            {question.options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.optionContainer}
                onPress={() => handleOptionSelect(index)}
              >
                <View style={[styles.bubble, selectedOption === index && styles.bubbleSelected]}>
                  {selectedOption === index && <View style={styles.bubbleDot} />}
                </View>
                <Text style={styles.optionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedOption === null && styles.nextButtonDisabled,
            ]}
            onPress={handleNext}
            disabled={selectedOption === null}
          >
            <Text style={[
              styles.nextButtonText,
              selectedOption === null && styles.nextButtonTextDisabled,
            ]}>
              {currentQuestion < varkQuestions.length - 1 ? 'Next' : 'Finish'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (screen === 'result') {
    const dominant = getDominantStyle();
    const recommendation = getRecommendation(dominant);
    return (
      <SafeAreaView style={styles.container}>
        <Header />
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>Hasil Test</Text>
          <Text style={styles.resultText}>
            Gaya belajar dominan Anda adalah {dominant}.
          </Text>
          <View style={styles.recommendation}>
            <Text style={styles.recommendationText}>{recommendation}</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return null;
}
