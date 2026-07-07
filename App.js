import { NavigationContainer } from "@react-navigation/native";

  // @section:imports @depends:[]
const React = require('react');
  const { useState, useEffect, useContext, useMemo, useCallback } = React;
  const { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert, Platform, StatusBar, Image, TextInput } = require('react-native');
  const { MaterialIcons } = require('@expo/vector-icons');
  const { createBottomTabNavigator } = require('@react-navigation/bottom-tabs');
// @end:imports

  // @section:theme @depends:[]
  const storageStrategy = 'local';
  const primaryColor = '#e480d394';
  const accentColor = '#FFE066';
  const backgroundColor = '#c9f0e262';
  const cardColor = '#FFFFFF';
  const textPrimary = '#2D1B69';
  const textSecondary = '#8B7CC8';
  const designStyle = 'playful';
  const appName = 'FLIPMOOD';
  // @end:theme

  // @section:navigation-setup @depends:[]
  const Tab = createBottomTabNavigator();
  // @end:navigation-setup

  // @section:ThemeContext @depends:[theme]
  const ThemeContext = React.createContext();
  const ThemeProvider = function(props) {
    const darkModeState = useState(false);
    const darkMode = darkModeState[0];
    const setDarkMode = darkModeState[1];
    
    const lightTheme = useMemo(function() {
      return {
        colors: {
          primary: primaryColor,
          accent: accentColor,
          background: backgroundColor,
          card: cardColor,
          textPrimary: textPrimary,
          textSecondary: textSecondary,
          border: '#FFE1F0',
          success: '#0b4b46ff',
          error: '#FF6B6B',
          warning: '#FFB74D'
        }
      };
    }, []);
    
    const darkTheme = useMemo(function() {
      return {
        colors: {
          primary: primaryColor,
          accent: accentColor,
          background: '#1A0B2E',
          card: '#2D1B69',
          textPrimary: '#FFFFFF',
          textSecondary: '#B794F6',
          border: '#4C1D95',
          success: '#4ECDC4',
          error: '#FF6B6B',
          warning: '#FFB74D'
        }
      };
    }, []);
    
    const theme = darkMode ? darkTheme : lightTheme;
    
    const toggleDarkMode = useCallback(function() {
      setDarkMode(function(prev) { return !prev; });
    }, []);
    
    const value = useMemo(function() {
      return { 
        theme: theme, 
        darkMode: darkMode, 
        toggleDarkMode: toggleDarkMode, 
        designStyle: designStyle 
      };
    }, [theme, darkMode, toggleDarkMode]);
    
    return React.createElement(ThemeContext.Provider, { value: value }, props.children);
  };
  
  const useTheme = function() { return useContext(ThemeContext); };
  // @end:ThemeContext

  // @section:GameScreen-state @depends:[ThemeContext]
const useGameScreenState = function() {
    const themeContext = useTheme();
    const theme = themeContext.theme;
    
    const totalCoinsState = useState(0);
    const totalCoins = totalCoinsState[0];
    const setTotalCoins = totalCoinsState[1];
    
    const completedLevelsState = useState({
      level1: false,
      level2: false,
      level3: false,
      level4: false,
      level5: false,
      level6: false,
      level7: false
    });
    const completedLevels = completedLevelsState[0];
    const setCompletedLevels = completedLevelsState[1];
    
    const activeModalState = useState(null);
    const activeModal = activeModalState[0];
    const setActiveModal = activeModalState[1];
    
    const currentQuestionState = useState(0);
    const currentQuestion = currentQuestionState[0];
    const setCurrentQuestion = currentQuestionState[1];
    
    const missionCompletedState = useState(false);
    const missionCompleted = missionCompletedState[0];
    const setMissionCompleted = missionCompletedState[1];
    
    const teamPointsState = useState(0);
    const teamPoints = teamPointsState[0];
    const setTeamPoints = teamPointsState[1];
    
    const invitedPlayersState = useState([]);
    const invitedPlayers = invitedPlayersState[0];
    const setInvitedPlayers = invitedPlayersState[1];
    
    const newPlayerNameState = useState('');
    const newPlayerName = newPlayerNameState[0];
    const setNewPlayerName = newPlayerNameState[1];
    
    const level5QuestionStateState = useState(0);
    const level5QuestionState = level5QuestionStateState[0];
    const setLevel5QuestionState = level5QuestionStateState[1];
    
    return {
      theme: theme,
      totalCoins: totalCoins,
      setTotalCoins: setTotalCoins,
      completedLevels: completedLevels,
      setCompletedLevels: setCompletedLevels,
      activeModal: activeModal,
      setActiveModal: setActiveModal,
      currentQuestion: currentQuestion,
      setCurrentQuestion: setCurrentQuestion,
      missionCompleted: missionCompleted,
      setMissionCompleted: setMissionCompleted,
      teamPoints: teamPoints,
      setTeamPoints: setTeamPoints,
      invitedPlayers: invitedPlayers,
      setInvitedPlayers: setInvitedPlayers,
      newPlayerName: newPlayerName,
      setNewPlayerName: setNewPlayerName,
      level5QuestionState: level5QuestionState,
      setLevel5QuestionState: setLevel5QuestionState
    };
  };
// @end:GameScreen-state

  // @section:GameScreen-data @depends:[]
const gameData = {
    levels: [
      {
        id: 'level1',
        title: 'Откривател на емоции',
        description: 'Свържи лицето с чувството',
        coins: 30,
        icon: 'sentiment-satisfied-alt',
        color: '#FF6B9D'
      },
      {
        id: 'level2', 
        title: 'Слушам и разбирам',
        description: 'Интерактивен диалог',
        coins: 40,
        icon: 'psychology',
        color: '#9C27B0'
      },
      {
        id: 'level3',
        title: 'Добрият избор',
        description: 'Избор между няколко реакции',
        coins: 50,
        icon: 'favorite',
        color: '#E91E63'
      },
      {
        id: 'level4',
        title: 'Тайна мисия',
        description: 'Изпълни малък жест',
        coins: 70,
        icon: 'volunteer-activism',
        color: '#F44336'
      },
      {
        id: 'level5',
        title: 'В обувките на другия',
        description: 'Кратка история от първо лице',
        coins: 90,
        icon: 'accessibility',
        color: '#00BCD4'
      },
      {
        id: 'level6',
        title: 'Екипна сила',
        description: 'Събирайте точки като екип',
        coins: 100,
        icon: 'group',
        color: '#4CAF50'
      },
      {
        id: 'level7',
        title: 'Посланик на доброто',
        description: 'Сподели послание или съвет',
        coins: 90,
        icon: 'share',
        color: '#FF9800'
      }
    ],
    emotionQuestions: [
      {
        emotion: 'Радост',
        description: 'Топлотно, светло чувство, което те кара да се усмихнеш',
        options: ['Щастие', 'Тъга', 'Гняв', 'Страх','Изненада'],
        correct: 0
      },
      {
        emotion: 'Съчувствие',
        description: 'Разбирането и споделянето на чувствата на друг човек',
        options: ['Ревност', 'Състрадателност', 'Разочарование', 'Гордост'],
        correct: 1
      }
    ],
    dialogueQuestions: [
      {
        scenario: 'Мирела току-що загуби любимата си играчка и седи сама',
        question: 'Как мислиш, че се чувства Мирела?',
        options: ['Щастлива', 'Тъжна', 'Развълнувана', 'Ядосана'],
        correct: 1
      },
      {
        scenario: 'Никол получи отлична оценка на теста си',
        question: 'Как мислиш, че се чувства Никол?',
        options: ['Разочарована', 'Объркана', 'Горда', 'Притеснена'],
        correct: 2
      }
    ],
    empathyChoices: [
      {
        situation: 'Твоят приятел е подложен на тормоз от други',
        aggressive: 'Подходи с побой',
        passive: 'Отиди си и игнорирай ситуацията',
        empathetic: 'Отиди до твоят приятел и окажи подкрепа',
        correct: 'empathetic'
      },
      {
        situation: 'Някой се пререди пред теб в опашката',
        aggressive: 'Вдигни скандал',
        passive: 'Не казвай нищо и остави да мине пред теб',
        empathetic: 'Вежливо уведоми, че има опашка',
        correct: 'empathetic'
      }
    ],
    perspectiveStories: [
      {
        title: 'История на Мария',
        story: 'Мария е нова в училище и няма приятели. Всеки ден сяда сама на обяд и наблюдава другите деца, които се смеят заедно. Чувства се невидима и разтроена.',
        feelings: ['Самотна', 'Невидима', 'Уплашена', 'Разтроена'],
        correctFeeling: 0,
        helpQuestion: 'Как би помогнал на Мария?',
        helpOptions: ['Заговори я и я включи в групата', 'Престори се , че не я виждаш', 'Кажи й, че е нова и трябва да изчака', 'Остави я сама'],
        correctHelp: 0
      },
      {
        title: 'История на Петър',
        story: 'Петър е с астма и не може да играе футбол както другите. Седи встрани и гледа как всички се забавляват, а той не може да се присъедини.',
        feelings: ['Разочарован', 'Завистлив', 'Изключен', 'Самотен'],
        correctFeeling: 2,
        helpQuestion: 'Как би помогнал на Петър?',
        helpOptions: ['Предложи му да е съдия на мача и да е важен', 'Кажи му, че няма да може да играе', 'Изненадай го, като го поканиш да гледа', 'Игнорирай го'],
        correctHelp: 0
      }
    ],
    secretMissions: [
      {
        title: 'Похвали някого',
        description: 'Дай искрена похвала на някого днес',
        instructions: 'Намери човек и му кажи нещо хубаво'
      },
      {
        title: 'Помогни на приятел',
        description: 'Предложи да помогнеш на някого в задача',
        instructions: 'Потърси възможности да окажеш помощна ръка'
      },
      {
        title: 'Раздели нещо',
        description: 'Раздели нещо, което имаш, с друг човек',
        instructions: 'Може да е храна, играчки или дори твоето време'
      }
    ],
    ambassadorMessages: [
      {
        message: 'Малки прояви на доброта създават големи промени! Бъди камък в океана на добротата.',
        icon: 'favorite'
      },
      {
        message: 'Емпатията е суперсила! Когато разбираш другите, им помагаш истински.',
        icon: 'psychology'
      },
      {
        message: 'Всеки може да бъде посланик на доброто. Започни днес с един малък жест!',
        icon: 'volunteer-activism'
      },
      {
        message: 'Слушай със сърцето, действай с любов, променяй света с доброта!',
        icon: 'hearing'
      }
    ]
  };
// @end:GameScreen-data

  // @section:GameScreen-handlers @depends:[GameScreen-state,GameScreen-data]
const gameScreenHandlers = {
    openLevel: function(state, levelId) {
      state.setActiveModal(levelId);
      state.setCurrentQuestion(0);
      state.setMissionCompleted(false);
      state.setLevel5QuestionState(0);
      state.setTeamPoints(0);
      state.setNewPlayerName('');
    },
    closeModal: function(state) {
      state.setActiveModal(null);
      state.setCurrentQuestion(0);
      state.setMissionCompleted(false);
      state.setLevel5QuestionState(0);
      state.setNewPlayerName('');
    },
    completeLevel: function(state, levelId, coins) {
      state.setTotalCoins(function(prev) { return prev + coins; });
      
      state.setCompletedLevels(function(prev) {
        var updated = {};
        for (var key in prev) {
          updated[key] = prev[key];
        }
        updated[levelId] = true;
        return updated;
      });
      state.setActiveModal(null);
      Platform.OS === 'web' 
        ? window.alert('Level completed! You earned ' + coins + ' emotion coins!')
        : Alert.alert('Success!', 'Level completed! You earned ' + coins + ' emotion coins!');
    },
    handleAnswer: function(state, isCorrect, levelId, coins) {
      if (isCorrect) {
        if (state.currentQuestion < gameData.emotionQuestions.length - 1) {
          state.setCurrentQuestion(function(prev) { return prev + 1; });
        } else {
          gameScreenHandlers.completeLevel(state, levelId, coins);
        }
      } else {
        Platform.OS === 'web' 
          ? window.alert('Try again!')
          : Alert.alert('Try Again', 'That\'s not quite right. Give it another try!');
      }
    },
    handleDialogueAnswer: function(state, isCorrect, levelId, coins) {
      if (isCorrect) {
        if (state.currentQuestion < gameData.dialogueQuestions.length - 1) {
          state.setCurrentQuestion(function(prev) { return prev + 1; });
        } else {
          gameScreenHandlers.completeLevel(state, levelId, coins);
        }
      } else {
        Platform.OS === 'web' 
          ? window.alert('Think again about how they might feel')
          : Alert.alert('Think Again', 'Think again about how they might feel');
      }
    },
    handleEmpathyChoice: function(state, choice, levelId, coins) {
      var currentChoice = gameData.empathyChoices[state.currentQuestion];
      if (choice === currentChoice.correct) {
        if (state.currentQuestion < gameData.empathyChoices.length - 1) {
          state.setCurrentQuestion(function(prev) { return prev + 1; });
        } else {
          gameScreenHandlers.completeLevel(state, levelId, coins);
        }
      } else {
        Platform.OS === 'web' 
          ? window.alert('Try choosing the most compassionate response')
          : Alert.alert('Try Again', 'Try choosing the most compassionate response');
      }
    },
    handlePerspectiveAnswer: function(state, isCorrect, levelId, coins) {
      if (isCorrect) {
        if (state.level5QuestionState < gameData.perspectiveStories.length * 2 - 1) {
          state.setLevel5QuestionState(function(prev) { return prev + 1; });
        } else {
          gameScreenHandlers.completeLevel(state, levelId, coins);
        }
      } else {
        Platform.OS === 'web' 
          ? window.alert('Think about how the person really feels')
          : Alert.alert('Try Again', 'Think about how the person really feels');
      }
    },
    completeMission: function(state, levelId, coins) {
      state.setMissionCompleted(true);
      gameScreenHandlers.completeLevel(state, levelId, coins);
    },
    addTeamPoints: function(state, points) {
      state.setTeamPoints(function(prev) { return prev + points; });
    },
    addInvitedPlayer: function(state, playerName) {
      if (playerName && playerName.trim()) {
        state.setInvitedPlayers(function(prev) {
          return prev.concat([playerName]);
        });
      }
    }
  };
// @end:GameScreen-handlers

  // @section:GameScreen-LevelCard @depends:[styles]
const renderLevelCard = function(level, state, handlers) {
    var isCompleted = state.completedLevels[level.id];
    return React.createElement(TouchableOpacity,
      {
        key: level.id,
        style: [
          styles.levelCard,
          { backgroundColor: state.theme.colors.card },
          isCompleted && { opacity: 0.7 }
        ],
        onPress: function() { handlers.openLevel(state, level.id); },
        componentId: 'level-card-' + level.id
      },
      React.createElement(View, { style: styles.levelIconContainer },
        React.createElement(MaterialIcons, {
          name: level.icon,
          size: 40,
          color: level.color
        }),
        isCompleted && React.createElement(MaterialIcons, {
          name: 'check-circle',
          size: 24,
          color: state.theme.colors.success,
          style: styles.completedIcon
        })
      ),
      React.createElement(Text, {
        style: [styles.levelTitle, { color: state.theme.colors.textPrimary }]
      }, level.title),
      React.createElement(Text, {
        style: [styles.levelDescription, { color: state.theme.colors.textSecondary }]
      }, level.description),
      React.createElement(View, { style: styles.coinsContainer },
        React.createElement(MaterialIcons, {
          name: 'stars',
          size: 20,
          color: state.theme.colors.accent
        }),
        React.createElement(Text, {
          style: [styles.coinsText, { color: state.theme.colors.accent }]
        }, level.coins + ' монети')
      )
    );
  };
// @end:GameScreen-LevelCard

  // @section:GameScreen-Level1Modal @depends:[styles,GameScreen-data]
const renderLevel1Modal = function(state, handlers) {
    if (state.activeModal !== 'level1') return null;
    
    var question = gameData.emotionQuestions[state.currentQuestion];
    
    return React.createElement(Modal, {
      visible: true,
      animationType: 'slide',
      transparent: true,
      onRequestClose: function() { handlers.closeModal(state); }
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'level1-modal-overlay' },
        React.createElement(View, {
          style: [styles.modalContent, { backgroundColor: state.theme.colors.card }],
          componentId: 'level1-modal-content'
        },
          React.createElement(TouchableOpacity, {
            style: styles.closeButton,
            onPress: function() { handlers.closeModal(state); },
            componentId: 'level1-close-button'
          },
            React.createElement(MaterialIcons, {
              name: 'close',
              size: 24,
              color: state.theme.colors.textSecondary
            })
          ),
          React.createElement(Text, {
            style: [styles.modalTitle, { color: state.theme.colors.textPrimary }],
            componentId: 'level1-title'
          }, 'Емоция: ' + question.emotion),
          React.createElement(Text, {
            style: [styles.modalDescription, { color: state.theme.colors.textSecondary }],
            componentId: 'level1-description'
          }, question.description),
          React.createElement(Text, {
            style: [styles.questionText, { color: state.theme.colors.textPrimary }],
            componentId: 'level1-question'
          }, 'Каква думата най-добре описва това чувство?'),
          React.createElement(View, { style: styles.optionsContainer },
            question.options.map(function(option, index) {
              return React.createElement(TouchableOpacity, {
                key: index,
                style: [styles.optionButton, { borderColor: state.theme.colors.primary }],
                onPress: function() {
                  handlers.handleAnswer(state, index === question.correct, 'level1', 50);
                },
                componentId: 'level1-option-' + index
              },
                React.createElement(Text, {
                  style: [styles.optionText, { color: state.theme.colors.primary }]
                }, option)
              );
            })
          )
        )
      )
    );
  };
// @end:GameScreen-Level1Modal

  // @section:GameScreen-Level2Modal @depends:[styles,GameScreen-data]
const renderLevel2Modal = function(state, handlers) {
    if (state.activeModal !== 'level2') return null;
    
    var question = gameData.dialogueQuestions[state.currentQuestion];
    
    return React.createElement(Modal, {
      visible: true,
      animationType: 'slide',
      transparent: true,
      onRequestClose: function() { handlers.closeModal(state); }
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'level2-modal-overlay' },
        React.createElement(View, {
          style: [styles.modalContent, { backgroundColor: state.theme.colors.card }],
          componentId: 'level2-modal-content'
        },
          React.createElement(TouchableOpacity, {
            style: styles.closeButton,
            onPress: function() { handlers.closeModal(state); },
            componentId: 'level2-close-button'
          },
            React.createElement(MaterialIcons, {
              name: 'close',
              size: 24,
              color: state.theme.colors.textSecondary
            })
          ),
          React.createElement(Text, {
            style: [styles.modalTitle, { color: state.theme.colors.textPrimary }],
            componentId: 'level2-title'
          }, 'Интерпретатор на емоции'),
          React.createElement(Text, {
            style: [styles.scenarioText, { color: state.theme.colors.textSecondary }],
            componentId: 'level2-scenario'
          }, question.scenario),
          React.createElement(Text, {
            style: [styles.questionText, { color: state.theme.colors.textPrimary }],
            componentId: 'level2-question'
          }, question.question),
          React.createElement(View, { style: styles.optionsContainer },
            question.options.map(function(option, index) {
              return React.createElement(TouchableOpacity, {
                key: index,
                style: [styles.optionButton, { borderColor: state.theme.colors.primary }],
                onPress: function() {
                  handlers.handleDialogueAnswer(state, index === question.correct, 'level2', 75);
                },
                componentId: 'level2-option-' + index
              },
                React.createElement(Text, {
                  style: [styles.optionText, { color: state.theme.colors.primary }]
                }, option)
              );
            })
          )
        )
      )
    );
  };
// @end:GameScreen-Level2Modal

  // @section:GameScreen-Level3Modal @depends:[styles,GameScreen-data]
const renderLevel3Modal = function(state, handlers) {
    if (state.activeModal !== 'level3') return null;
    
    var choice = gameData.empathyChoices[state.currentQuestion];
    
    return React.createElement(Modal, {
      visible: true,
      animationType: 'slide',
      transparent: true,
      onRequestClose: function() { handlers.closeModal(state); }
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'level3-modal-overlay' },
        React.createElement(View, {
          style: [styles.modalContent, { backgroundColor: state.theme.colors.card }],
          componentId: 'level3-modal-content'
        },
          React.createElement(TouchableOpacity, {
            style: styles.closeButton,
            onPress: function() { handlers.closeModal(state); },
            componentId: 'level3-close-button'
          },
            React.createElement(MaterialIcons, {
              name: 'close',
              size: 24,
              color: state.theme.colors.textSecondary
            })
          ),
          React.createElement(Text, {
            style: [styles.modalTitle, { color: state.theme.colors.textPrimary }],
            componentId: 'level3-title'
          }, 'Избор със съчувствие'),
          React.createElement(Text, {
            style: [styles.scenarioText, { color: state.theme.colors.textSecondary }],
            componentId: 'level3-scenario'
          }, choice.situation),
          React.createElement(Text, {
            style: [styles.questionText, { color: state.theme.colors.textPrimary }],
            componentId: 'level3-question'
          }, 'Как би реагирал?'),
          React.createElement(View, { style: styles.choicesContainer },
            React.createElement(TouchableOpacity, {
              style: [styles.choiceButton, styles.aggressiveChoice],
              onPress: function() {
                handlers.handleEmpathyChoice(state, 'aggressive', 'level3', 100);
              },
              componentId: 'level3-aggressive'
            },
              React.createElement(Text, { style: styles.choiceLabel }, 'Агресивно'),
              React.createElement(Text, { style: styles.choiceText }, choice.aggressive)
            ),
            React.createElement(TouchableOpacity, {
              style: [styles.choiceButton, styles.passiveChoice],
              onPress: function() {
                handlers.handleEmpathyChoice(state, 'passive', 'level3', 100);
              },
              componentId: 'level3-passive'
            },
              React.createElement(Text, { style: styles.choiceLabel }, 'Пасивно'),
              React.createElement(Text, { style: styles.choiceText }, choice.passive)
            ),
            React.createElement(TouchableOpacity, {
              style: [styles.choiceButton, styles.empathicChoice],
              onPress: function() {
                handlers.handleEmpathyChoice(state, 'empathetic', 'level3', 100);
              },
              componentId: 'level3-empathetic'
            },
              React.createElement(Text, { style: styles.choiceLabel }, 'С Съчувствие'),
              React.createElement(Text, { style: styles.choiceText }, choice.empathetic)
            )
          )
        )
      )
    );
  };
// @end:GameScreen-Level3Modal

  // @section:GameScreen-Level4Modal @depends:[styles,GameScreen-data]
const renderLevel4Modal = function(state, handlers) {
    if (state.activeModal !== 'level4') return null;
    
    var mission = gameData.secretMissions[Math.floor(Math.random() * gameData.secretMissions.length)];
    
    return React.createElement(Modal, {
      visible: true,
      animationType: 'slide',
      transparent: true,
      onRequestClose: function() { handlers.closeModal(state); }
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'level4-modal-overlay' },
        React.createElement(View, {
          style: [styles.modalContent, { backgroundColor: state.theme.colors.card }],
          componentId: 'level4-modal-content'
        },
          React.createElement(TouchableOpacity, {
            style: styles.closeButton,
            onPress: function() { handlers.closeModal(state); },
            componentId: 'level4-close-button'
          },
            React.createElement(MaterialIcons, {
              name: 'close',
              size: 24,
              color: state.theme.colors.textSecondary
            })
          ),
          React.createElement(MaterialIcons, {
            name: 'volunteer-activism',
            size: 60,
            color: state.theme.colors.primary,
            style: styles.missionIcon
          }),
          React.createElement(Text, {
            style: [styles.modalTitle, { color: state.theme.colors.textPrimary }],
            componentId: 'level4-title'
          }, 'Тайна мисия'),
          React.createElement(Text, {
            style: [styles.missionTitle, { color: state.theme.colors.primary }],
            componentId: 'level4-mission-title'
          }, mission.title),
          React.createElement(Text, {
            style: [styles.missionDescription, { color: state.theme.colors.textSecondary }],
            componentId: 'level4-mission-desc'
          }, mission.description),
          React.createElement(Text, {
            style: [styles.missionInstructions, { color: state.theme.colors.textPrimary }],
            componentId: 'level4-instructions'
          }, mission.instructions),
          !state.missionCompleted && React.createElement(TouchableOpacity, {
            style: [styles.completeButton, { backgroundColor: state.theme.colors.success }],
            onPress: function() {
              handlers.completeMission(state, 'level4', 150);
            },
            componentId: 'level4-complete-button'
          },
            React.createElement(MaterialIcons, {
              name: 'check',
              size: 24,
              color: '#FFFFFF'
            }),
            React.createElement(Text, { style: styles.completeButtonText }, 'Завърших това!')
          )
        )
      )
    );
  };
// @end:GameScreen-Level4Modal

  // @section:GameScreen-Level5Modal @depends:[styles,GameScreen-data]
const renderLevel5Modal = function(state, handlers) {
    if (state.activeModal !== 'level5') return null;
    
    var storyIndex = Math.floor(state.level5QuestionState / 2);
    var isSecondQuestion = state.level5QuestionState % 2 === 1;
    var currentStory = gameData.perspectiveStories[storyIndex];
    
    if (!currentStory) return null;
    
    return React.createElement(Modal, {
      visible: true,
      animationType: 'slide',
      transparent: true,
      onRequestClose: function() { handlers.closeModal(state); }
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'level5-modal-overlay' },
        React.createElement(ScrollView, {
          style: [styles.modalContent, { backgroundColor: state.theme.colors.card }],
          contentContainerStyle: { paddingBottom: 20 },
          componentId: 'level5-modal-content'
        },
          React.createElement(TouchableOpacity, {
            style: styles.closeButton,
            onPress: function() { handlers.closeModal(state); },
            componentId: 'level5-close-button'
          },
            React.createElement(MaterialIcons, {
              name: 'close',
              size: 24,
              color: state.theme.colors.textSecondary
            })
          ),
          React.createElement(Text, {
            style: [styles.modalTitle, { color: state.theme.colors.textPrimary }],
            componentId: 'level5-title'
          }, 'В обувките на другия'),
          React.createElement(Text, {
            style: [styles.storyTitle, { color: state.theme.colors.primary }],
            componentId: 'level5-story-title'
          }, currentStory.title),
          React.createElement(Text, {
            style: [styles.storyText, { color: state.theme.colors.textSecondary }],
            componentId: 'level5-story'
          }, currentStory.story),
          !isSecondQuestion && React.createElement(View, { style: styles.storyQuestionsContainer },
            React.createElement(Text, {
              style: [styles.questionText, { color: state.theme.colors.textPrimary }],
              componentId: 'level5-feeling-question'
            }, currentStory.helpQuestion),
            React.createElement(View, { style: styles.optionsContainer },
              currentStory.helpOptions.map(function(option, index) {
                return React.createElement(TouchableOpacity, {
                  key: index,
                  style: [styles.optionButton, { borderColor: state.theme.colors.primary }],
                  onPress: function() {
                    var isCorrect = index === currentStory.correctHelp;
                    handlers.handlePerspectiveAnswer(state, isCorrect, 'level5', 125);
                  },
                  componentId: 'level5-help-option-' + index
                },
                  React.createElement(Text, {
                    style: [styles.optionText, { color: state.theme.colors.primary }]
                  }, option)
                );
              })
            )
          ),
          isSecondQuestion && React.createElement(View, { style: styles.storyQuestionsContainer },
            React.createElement(Text, {
              style: [styles.questionText, { color: state.theme.colors.textPrimary }],
              componentId: 'level5-feeling-question-2'
            }, 'Какво чувство има этия човек?'),
            React.createElement(View, { style: styles.optionsContainer },
              currentStory.feelings.map(function(feeling, index) {
                return React.createElement(TouchableOpacity, {
                  key: index,
                  style: [styles.optionButton, { borderColor: state.theme.colors.primary }],
                  onPress: function() {
                    var isCorrect = index === currentStory.correctFeeling;
                    handlers.handlePerspectiveAnswer(state, isCorrect, 'level5', 125);
                  },
                  componentId: 'level5-feeling-option-' + index
                },
                  React.createElement(Text, {
                    style: [styles.optionText, { color: state.theme.colors.primary }]
                  }, feeling)
                );
              })
            )
          )
        )
      )
    );
  };
// @end:GameScreen-Level5Modal

  // @section:GameScreen-Level6Modal @depends:[styles,GameScreen-data]
const renderLevel6Modal = function(state, handlers) {
    if (state.activeModal !== 'level6') return null;
    
    var progress = (state.teamPoints / 200) * 100;
    var isComplete = state.teamPoints >= 200;
    
    return React.createElement(Modal, {
      visible: true,
      animationType: 'slide',
      transparent: true,
      onRequestClose: function() { handlers.closeModal(state); }
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'level6-modal-overlay' },
        React.createElement(ScrollView, {
          style: [styles.modalContent, { backgroundColor: state.theme.colors.card }],
          contentContainerStyle: { paddingBottom: 20 },
          componentId: 'level6-modal-content'
        },
          React.createElement(TouchableOpacity, {
            style: styles.closeButton,
            onPress: function() { handlers.closeModal(state); },
            componentId: 'level6-close-button'
          },
            React.createElement(MaterialIcons, {
              name: 'close',
              size: 24,
              color: state.theme.colors.textSecondary
            })
          ),
          React.createElement(MaterialIcons, {
            name: 'group',
            size: 60,
            color: state.theme.colors.success,
            style: styles.missionIcon
          }),
          React.createElement(Text, {
            style: [styles.modalTitle, { color: state.theme.colors.textPrimary }],
            componentId: 'level6-title'
          }, 'Екипна сила'),
          React.createElement(Text, {
            style: [styles.missionDescription, { color: state.theme.colors.textSecondary }],
            componentId: 'level6-description'
          }, 'Събери 200 точки с други играчи за да завършиш това ниво'),
          React.createElement(View, { style: styles.teamProgressContainer },
            React.createElement(View, { 
              style: [styles.progressBar, { backgroundColor: state.theme.colors.border }],
              componentId: 'level6-progress-bar'
            },
              React.createElement(View, {
                style: [
                  styles.progressFill,
                  { 
                    backgroundColor: state.theme.colors.success,
                    width: Math.min(progress, 100) + '%'
                  }
                ],
                componentId: 'level6-progress-fill'
              })
            ),
            React.createElement(Text, {
              style: [styles.progressText, { color: state.theme.colors.textPrimary }],
              componentId: 'level6-progress-text'
            }, state.teamPoints + '/200 точки')
          ),
          !isComplete && React.createElement(View, null,
            React.createElement(Text, {
              style: [styles.questionText, { color: state.theme.colors.textPrimary }],
              componentId: 'level6-add-points-label'
            }, 'Добави точки за екипа:'),
            React.createElement(View, { style: styles.pointsButtonsContainer },
              React.createElement(TouchableOpacity, {
                style: [styles.addPointsButton, { backgroundColor: state.theme.colors.accent }],
                onPress: function() { handlers.addTeamPoints(state, 25); },
                componentId: 'level6-add-25'
              },
                React.createElement(Text, { style: styles.addPointsText }, '+25')
              ),
              React.createElement(TouchableOpacity, {
                style: [styles.addPointsButton, { backgroundColor: state.theme.colors.accent }],
                onPress: function() { handlers.addTeamPoints(state, 50); },
                componentId: 'level6-add-50'
              },
                React.createElement(Text, { style: styles.addPointsText }, '+50')
              ),
              React.createElement(TouchableOpacity, {
                style: [styles.addPointsButton, { backgroundColor: state.theme.colors.accent }],
                onPress: function() { handlers.addTeamPoints(state, 75); },
                componentId: 'level6-add-75'
              },
                React.createElement(Text, { style: styles.addPointsText }, '+75')
              )
            )
          ),
          isComplete && React.createElement(TouchableOpacity, {
            style: [styles.completeButton, { backgroundColor: state.theme.colors.success }],
            onPress: function() {
              handlers.completeLevel(state, 'level6', 200);
            },
            componentId: 'level6-complete-button'
          },
            React.createElement(MaterialIcons, {
              name: 'check',
              size: 24,
              color: '#FFFFFF'
            }),
            React.createElement(Text, { style: styles.completeButtonText }, 'Завърши ниво!')
          ),
          state.invitedPlayers && state.invitedPlayers.length > 0 && React.createElement(View, { style: styles.invitedPlayersList },
            React.createElement(Text, {
              style: [styles.missionTitle, { color: state.theme.colors.primary }],
              componentId: 'level6-invited-title'
            }, 'Поканени играчи:'),
            state.invitedPlayers.map(function(player, index) {
              return React.createElement(Text, {
                key: index,
                style: [styles.invitedPlayerItem, { color: state.theme.colors.textSecondary }],
                componentId: 'level6-invited-' + index
              }, '• ' + player);
            })
          )
        )
      )
    );
  };
// @end:GameScreen-Level6Modal

  // @section:GameScreen-Level7Modal @depends:[styles,GameScreen-data]
const renderLevel7Modal = function(state, handlers) {
    if (state.activeModal !== 'level7') return null;
    
    var ambassadorMessage = gameData.ambassadorMessages[Math.floor(Math.random() * gameData.ambassadorMessages.length)];
    
    return React.createElement(Modal, {
      visible: true,
      animationType: 'slide',
      transparent: true,
      onRequestClose: function() { handlers.closeModal(state); }
    },
      React.createElement(View, { style: styles.modalOverlay, componentId: 'level7-modal-overlay' },
        React.createElement(ScrollView, {
          style: [styles.modalContent, { backgroundColor: state.theme.colors.card }],
          contentContainerStyle: { paddingBottom: 20 },
          componentId: 'level7-modal-content'
        },
          React.createElement(TouchableOpacity, {
            style: styles.closeButton,
            onPress: function() { handlers.closeModal(state); },
            componentId: 'level7-close-button'
          },
            React.createElement(MaterialIcons, {
              name: 'close',
              size: 24,
              color: state.theme.colors.textSecondary
            })
          ),
          React.createElement(MaterialIcons, {
            name: 'share',
            size: 60,
            color: state.theme.colors.primary,
            style: styles.missionIcon
          }),
          React.createElement(Text, {
            style: [styles.modalTitle, { color: state.theme.colors.textPrimary }],
            componentId: 'level7-title'
          }, 'Посланик на доброто'),
          React.createElement(View, { style: styles.ambassadorContainer },
            React.createElement(MaterialIcons, {
              name: ambassadorMessage.icon,
              size: 48,
              color: state.theme.colors.primary
            }),
            React.createElement(Text, {
              style: [styles.ambassadorMessage, { color: state.theme.colors.textPrimary }],
              componentId: 'level7-message'
            }, ambassadorMessage.message)
          ),
          React.createElement(Text, {
            style: [styles.missionDescription, { color: state.theme.colors.textSecondary }],
            componentId: 'level7-description'
          }, 'Поканете нов участник да се присъедини към пътешествието на доброта!'),
          React.createElement(View, { style: styles.invitationContainer },
            React.createElement(TextInput, {
              style: [styles.playerNameInput, { 
                color: state.theme.colors.textPrimary,
                borderColor: state.theme.colors.border
              }],
              placeholder: 'Въведи име на участник',
              placeholderTextColor: state.theme.colors.textSecondary,
              value: state.newPlayerName,
              onChangeText: function(text) { state.setNewPlayerName(text); },
              componentId: 'level7-player-input'
            }),
            React.createElement(TouchableOpacity, {
              style: [styles.inviteButton, { backgroundColor: state.theme.colors.primary }],
              onPress: function() {
                if (state.newPlayerName && state.newPlayerName.trim()) {
                  handlers.addInvitedPlayer(state, state.newPlayerName);
                  state.setNewPlayerName('');
                  if (state.invitedPlayers.length >= 2) {
                    handlers.completeLevel(state, 'level7', 175);
                  } else {
                    Platform.OS === 'web' 
                      ? window.alert('Отличен! ' + state.newPlayerName + ' е поканен!')
                      : Alert.alert('Успех!', 'Отличен! ' + state.newPlayerName + ' е поканен!');
                  }
                } else {
                  Platform.OS === 'web' 
                    ? window.alert('Моля, въведи име на участник')
                    : Alert.alert('Упс', 'Моля, въведи име на участник');
                }
              },
              componentId: 'level7-invite-button'
            },
              React.createElement(MaterialIcons, {
                name: 'person-add',
                size: 20,
                color: '#FFFFFF'
              }),
              React.createElement(Text, { style: styles.inviteButtonText }, 'Покани')
            )
          ),
          state.invitedPlayers && state.invitedPlayers.length > 0 && React.createElement(View, { style: styles.invitedPlayersList },
            React.createElement(Text, {
              style: [styles.missionTitle, { color: state.theme.colors.primary }],
              componentId: 'level7-invited-title'
            }, 'Поканени участници (' + state.invitedPlayers.length + '):'),
            state.invitedPlayers.map(function(player, index) {
              return React.createElement(Text, {
                key: index,
                style: [styles.invitedPlayerItem, { color: state.theme.colors.textSecondary }],
                componentId: 'level7-invited-' + index
              }, '✓ ' + player);
            })
          ),
          state.invitedPlayers && state.invitedPlayers.length >= 2 && React.createElement(TouchableOpacity, {
            style: [styles.completeButton, { backgroundColor: state.theme.colors.success }],
            onPress: function() {
              handlers.completeLevel(state, 'level7', 175);
            },
            componentId: 'level7-complete-button'
          },
            React.createElement(MaterialIcons, {
              name: 'check',
              size: 24,
              color: '#FFFFFF'
            }),
            React.createElement(Text, { style: styles.completeButtonText }, 'Завърши ниво!')
          )
        )
      )
    );
  };
// @end:GameScreen-Level7Modal

  // @section:GameScreen @depends:[GameScreen-state,GameScreen-handlers,GameScreen-LevelCard,GameScreen-Level1Modal,GameScreen-Level2Modal,GameScreen-Level3Modal,GameScreen-Level4Modal,GameScreen-Level5Modal,GameScreen-Level6Modal,GameScreen-Level7Modal,styles]
const GameScreen = function() {
    var state = useGameScreenState();
    var handlers = gameScreenHandlers;
    
    return React.createElement(View, {
      style: [styles.container, { backgroundColor: state.theme.colors.background }],
      componentId: 'game-screen'
    },
      React.createElement(StatusBar, { barStyle: 'dark-content' }),
      React.createElement(ScrollView, {
        contentContainerStyle: { paddingBottom: Platform.OS === 'web' ? 90 : 100 }
      },
        React.createElement(View, { style: styles.header },
          React.createElement(Text, {
            style: [styles.appTitle, { color: state.theme.colors.textPrimary }],
            componentId: 'game-title'
          }, appName),
          React.createElement(View, { style: styles.coinsHeader },
            React.createElement(MaterialIcons, {
              name: 'stars',
              size: 28,
              color: state.theme.colors.accent
            }),
            React.createElement(Text, {
              style: [styles.totalCoins, { color: state.theme.colors.accent }],
              componentId: 'total-coins'
            }, state.totalCoins + ' монети')
          )
        ),
        React.createElement(Text, {
          style: [styles.subtitle, { color: state.theme.colors.textSecondary }],
          componentId: 'game-subtitle'
        }, 'Завършвай предизвикателства за доброта и печели емоционални монети'),
        React.createElement(View, { style: styles.levelsContainer },
          gameData.levels.map(function(level) {
            return renderLevelCard(level, state, handlers);
          })
        )
      ),
      renderLevel1Modal(state, handlers),
      renderLevel2Modal(state, handlers),
      renderLevel3Modal(state, handlers),
      renderLevel4Modal(state, handlers),
      renderLevel5Modal(state, handlers),
      renderLevel6Modal(state, handlers),
      renderLevel7Modal(state, handlers)
    );
  };
// @end:GameScreen

  // @section:ProfileScreen @depends:[ThemeContext,styles]
const ProfileScreen = function() {
    var themeContext = useTheme();
    var theme = themeContext.theme;
    
    return React.createElement(ScrollView, {
      style: [styles.container, { backgroundColor: theme.colors.background }],
      componentId: 'profile-screen'
    },
      React.createElement(View, { style: styles.profileHeader },
        React.createElement(MaterialIcons, {
          name: 'account-circle',
          size: 80,
          color: theme.colors.primary
        }),
        React.createElement(Text, {
          style: [styles.profileTitle, { color: theme.colors.textPrimary }],
          componentId: 'profile-title'
        }, 'Твоето пътешествие'),
        React.createElement(Text, {
          style: [styles.profileSubtitle, { color: theme.colors.textSecondary }],
          componentId: 'profile-subtitle'
        }, 'Развиване на емоционална интелигентност')
      ),
      React.createElement(View, { style: styles.statsContainer },
        React.createElement(View, { style: [styles.statCard, { backgroundColor: theme.colors.card }] },
          React.createElement(MaterialIcons, {
            name: 'psychology',
            size: 32,
            color: theme.colors.primary
          }),
          React.createElement(Text, {
            style: [styles.statTitle, { color: theme.colors.textPrimary }]
          }, 'Ниво на съчувствие'),
          React.createElement(Text, {
            style: [styles.statValue, { color: theme.colors.accent }]
          }, 'Развиващо се')
        ),
        React.createElement(View, { style: [styles.statCard, { backgroundColor: theme.colors.card }] },
          React.createElement(MaterialIcons, {
            name: 'favorite',
            size: 32,
            color: theme.colors.error
          }),
          React.createElement(Text, {
            style: [styles.statTitle, { color: theme.colors.textPrimary }]
          }, 'Актове на доброта'),
          React.createElement(Text, {
            style: [styles.statValue, { color: theme.colors.accent }]
          }, 'Продължи!')
        )
      )
    );
  };
// @end:ProfileScreen

  // @section:TabNavigator @depends:[GameScreen,ProfileScreen,navigation-setup]
  const TabNavigator = function() {
    var themeContext = useTheme();
    var theme = themeContext.theme;
    
    return React.createElement(View, {
      style: { flex: 1, width: '100%', height: '100%', overflow: 'hidden' }
    },
      React.createElement(Tab.Navigator, {
        screenOptions: {
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            paddingBottom: Platform.OS === 'ios' ? 20 : 10,
            height: Platform.OS === 'ios' ? 80 : 70
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          headerShown: false
        }
      },
        React.createElement(Tab.Screen, {
          name: 'Game',
          component: GameScreen,
          options: {
            tabBarIcon: function(props) {
              return React.createElement(MaterialIcons, {
                name: 'games',
                size: 24,
                color: props.color
              });
            }
          }
        }),
        React.createElement(Tab.Screen, {
          name: 'Profile',
          component: ProfileScreen,
          options: {
            tabBarIcon: function(props) {
              return React.createElement(MaterialIcons, {
                name: 'person',
                size: 24,
                color: props.color
              });
            }
          }
        })
      )
    );
  };
  // @end:TabNavigator

  // @section:styles @depends:[theme]
const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 50 : 30,
      paddingBottom: 20
    },
    appTitle: {
      fontSize: 32,
      fontWeight: 'bold',
      letterSpacing: 1.5
    },
    coinsHeader: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    totalCoins: {
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 8
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 30,
      lineHeight: 22
    },
    levelsContainer: {
      gap: 20,
      paddingBottom: 20
    },
    levelCard: {
      borderRadius: 24,
      padding: 24,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.12,
      shadowRadius: 16,
      elevation: 8
    },
    levelIconContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      position: 'relative'
    },
    completedIcon: {
      position: 'absolute',
      right: -5,
      top: -5
    },
    levelTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 8
    },
    levelDescription: {
      fontSize: 14,
      lineHeight: 20,
      marginBottom: 16
    },
    coinsContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    coinsText: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 6
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20
    },
    modalContent: {
      borderRadius: 24,
      padding: 24,
      width: '100%',
      maxWidth: 400,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.25,
      shadowRadius: 20,
      elevation: 10
    },
    closeButton: {
      position: 'absolute',
      right: 20,
      top: 20,
      zIndex: 1
    },
    modalTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16
    },
    modalDescription: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 22,
      marginBottom: 20
    },
    storyTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 12
    },
    storyText: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
      marginBottom: 20,
      fontStyle: 'italic'
    },
    storyQuestionsContainer: {
      marginTop: 20
    },
    questionText: {
      fontSize: 18,
      fontWeight: '600',
      textAlign: 'center',
      marginBottom: 24
    },
    scenarioText: {
      fontSize: 16,
      textAlign: 'center',
      fontStyle: 'italic',
      marginBottom: 16,
      lineHeight: 22
    },
    optionsContainer: {
      gap: 12
    },
    optionButton: {
      borderWidth: 2,
      borderRadius: 16,
      padding: 16,
      alignItems: 'center'
    },
    optionText: {
      fontSize: 16,
      fontWeight: '600'
    },
    choicesContainer: {
      gap: 16
    },
    choiceButton: {
      borderRadius: 20,
      padding: 20,
      borderWidth: 2
    },
    aggressiveChoice: {
      backgroundColor: '#FFEBEE',
      borderColor: '#F44336'
    },
    passiveChoice: {
      backgroundColor: '#FFF3E0',
      borderColor: '#FF9800'
    },
    empathicChoice: {
      backgroundColor: '#E8F5E8',
      borderColor: '#4CAF50'
    },
    choiceLabel: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 8,
      textTransform: 'uppercase'
    },
    choiceText: {
      fontSize: 16,
      lineHeight: 22
    },
    missionIcon: {
      alignSelf: 'center',
      marginBottom: 16
    },
    missionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 12
    },
    missionDescription: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 16,
      lineHeight: 22
    },
    missionInstructions: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 24,
      lineHeight: 20
    },
    completeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
      borderRadius: 20,
      gap: 8
    },
    completeButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold'
    },
    teamProgressContainer: {
      marginBottom: 20,
      alignItems: 'center'
    },
    progressBar: {
      width: '100%',
      height: 12,
      borderRadius: 6,
      overflow: 'hidden',
      marginBottom: 8
    },
    progressFill: {
      height: '100%',
      borderRadius: 6
    },
    progressText: {
      fontSize: 14,
      fontWeight: '600',
      textAlign: 'center'
    },
    pointsButtonsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      gap: 12,
      marginBottom: 20
    },
    addPointsButton: {
      flex: 1,
      padding: 12,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center'
    },
    addPointsText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#2D1B69'
    },
    ambassadorContainer: {
      marginBottom: 24,
      alignItems: 'center'
    },
    ambassadorMessage: {
      fontSize: 16,
      textAlign: 'center',
      lineHeight: 24,
      marginTop: 12,
      fontStyle: 'italic'
    },
    invitationContainer: {
      marginBottom: 20,
      alignItems: 'center'
    },
    playerNameInput: {
      borderWidth: 2,
      borderRadius: 16,
      padding: 12,
      marginBottom: 12,
      fontSize: 16,
      width: '100%'
    },
    inviteButton: {
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8
    },
    inviteButtonText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#FFFFFF'
    },
    invitedPlayersList: {
      marginTop: 20,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: '#FFE1F0'
    },
    invitedPlayerItem: {
      fontSize: 14,

      marginTop: 8
    },
    profileHeader: {
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 30
    },
    profileTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      marginTop: 16,
      marginBottom: 8
    },
    profileSubtitle: {
      fontSize: 16
    },
    statsContainer: {
      gap: 20,
      paddingBottom: 20
    },
    statCard: {
      borderRadius: 20,
      padding: 24,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4
    },
    statTitle: {
      fontSize: 16,
      fontWeight: '600',
      marginTop: 12,
      marginBottom: 8
    },
    statValue: {
      fontSize: 20,
      fontWeight: 'bold'
    }
  });
// @end:styles

  // @section:return @depends:[ThemeProvider,TabNavigator]
  // return React.createElement(ThemeProvider, null,
  //   React.createElement(View, { style: { flex: 1, width: '100%', height: '100%' } },
  //     React.createElement(StatusBar, { barStyle: 'dark-content' }),
  //     React.createElement(TabNavigator)
  //   )
  // );
  // @end:return

  export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </ThemeProvider>
  );
  
}
