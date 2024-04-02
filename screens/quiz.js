import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Animated, Easing } from 'react-native';


const Quiz = ({ navigation }) => {
  const [questions, setQuestions] = useState();
  const [quesNo, setQuesNo] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(30); 
  const [selectedOption, setSelectedOption] = useState(null);
  const [jumpAnimation] = useState(new Animated.Value(0));
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    if (timeRemaining <= 10) {
      startJumpAnimation();
    } else if (animationStarted) {
      stopJumpAnimation();
    }
  }, [timeRemaining]);

  const startJumpAnimation = () => {
    if (!animationStarted) {
      setAnimationStarted(true);
      Animated.loop(
        Animated.sequence([
          Animated.timing(jumpAnimation, {
            toValue: -10,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
          Animated.timing(jumpAnimation, {
            toValue: 0,
            duration: 100,
            easing: Easing.linear,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  };

  const stopJumpAnimation = () => {
    setAnimationStarted(false);
    jumpAnimation.stopAnimation();
  };
  

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  const getQuiz = async () => {
    const url = 'https://opentdb.com/api.php?amount=10&category=18&type=multiple&encode=url3986';
    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data.results);
    setOptions(generateOptionsAndshuffle(data.results[0]));
  };

  useEffect(() => {
    getQuiz();
  }, []);

  
  useEffect(() => {
    const timer = setInterval(() => {
      if (timeRemaining > 0) {
        setTimeRemaining(timeRemaining - 1);
      } else {
        if (quesNo !== 9) {
          handleNextPress();
        } else {
          handleShowResult();
        }
      }
    }, 1000); 
    

    return () => clearInterval(timer);
  }, [timeRemaining, quesNo]);

  const generateOptionsAndshuffle = (_question) => {
    const options = [..._question.incorrect_answers];
    options.push(_question.correct_answer);
    shuffleArray(options);
    return options;
  };

  const handleNextPress = () => {
    setQuesNo(quesNo + 1);
    setOptions(generateOptionsAndshuffle(questions[quesNo + 1]));
    setSelectedOption(null);
    setTimeRemaining(30);
  };

  const handleOptionPress = (_option) => {
    setSelectedOption(_option);
    if (_option === questions[quesNo].correct_answer) {
      setScore(score + 10);
    }

    setTimeout(() => {
      if (quesNo !== 9) {
        handleNextPress();
      } else {
        handleShowResult();
      }
      setSelectedOption(null);
      setTimeRemaining(30);
    }, 500); 
  };

  const handleShowResult = () => {
    navigation.navigate('Result', {
      score: score,
    });
  };

  return (
    <View style={styles.container}>
      {questions && (
        <View style={styles.parent}>
          <View style={styles.question}>
            <Text style={styles.questionText}>
              Q. {decodeURIComponent(questions[quesNo].question)}
            </Text>
            
            
          </View>
          
          <View style={styles.options}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.button,
                  {
                    backgroundColor: selectedOption === option
                      ? option === questions[quesNo].correct_answer
                        ? 'green'
                        : 'red'
                      : '#9a8c98',
                  },
                ]}
                onPress={() => handleOptionPress(option)}
                disabled={selectedOption !== null} 
              >
                <Text style={styles.buttonText}>
                  {' '}
                  {decodeURIComponent(option)}{' '}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.middle}>
          <TouchableOpacity 
        style={[styles.timerBox, { transform: [{ translateY: jumpAnimation }] }]}
        disabled>
        <Text style={styles.timerText}>Time Remaining: {timeRemaining}</Text>
      </TouchableOpacity>

          <TouchableOpacity style={styles.scoreBox}>
            <Text style={styles.scoreText}>Score: {score}</Text>
          </TouchableOpacity>
        </View>
          <View style={styles.bottom}>
          
            {quesNo !== 9 && (
              <TouchableOpacity
                style={styles.buttonNext}
                onPress={handleNextPress}
              >
                <Text style={styles.buttonText}>SKIP</Text>
              </TouchableOpacity>
            )}
            {quesNo === 9 && (
              <TouchableOpacity
                style={styles.buttonNext}
                onPress={handleShowResult}
              >
                <Text style={styles.buttonText}>Show Result</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </View>
  );
};


export default Quiz;

const styles = StyleSheet.create({
container:{
marginTop: 25,
height: "100%",
flex: 1,
backgroundColor: '#f0f0f0',
padding: 20,
position: 'relative',
},
question:{
marginVertical: 20,
},
options:{
marginVertical: 12,
flex: 1,
},
bottom:{
marginBottom: 12,
paddingVertical: 16,
justifyContent: "space-between",
flexDirection: "row"
},
button:{
    width: "100%",
    backgroundColor: '#9a8c98',
    padding: 20,
    borderRadius: 16,
    marginVertical: 8,
  },
  buttonNext:{
    backgroundColor: '#4a4e69',
    padding: 16,
    borderRadius: 16,
    marginVertical: 8,
    alignItems: 'center',
  },
  buttonText:{
    fontWeight: "800",
    fontSize: 15,
    color: "white"

  },
  questionText:{
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333', // Dark gray color
    textShadowColor: '#ccc', // Light gray shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius
    lineHeight: 30, 
  },
  parent:{
    height: "100%"
  },
  middle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  timerBox: {
    backgroundColor: '#4a90e2',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  scoreBox: {
    backgroundColor: '#4a90e2',
    borderRadius: 50,
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
  },
  timerText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});