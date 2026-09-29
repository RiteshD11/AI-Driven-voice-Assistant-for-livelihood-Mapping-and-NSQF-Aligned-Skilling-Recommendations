import { VoiceSession, VoiceQuestion } from '../../types';

export const mockVoiceQuestions: VoiceQuestion[] = [
  {
    id: 'vq-01',
    index: 1,
    questionText: {
      en: "Hello! Welcome to Kaushal Saathi. What is your name and where do you live?",
      hi: "नमस्ते! कौशल साथी में आपका स्वागत है। आपका नाम क्या है और आप कहाँ रहते हैं?",
      mr: "नमस्कार! कौशल साथीमध्ये आपले स्वागत आहे. आपले नाव काय आहे आणि आपण कुठे राहता?"
    },
    expectedAnswers: [
      "मेरा नाम रामेश्वर शिंदे है, मैं पुणे के पास रहता हूँ।",
      "माझं नाव रामेश्वर शिंदे आहे, मी पुण्यात राहतो.",
      "My name is Rameshwar Shinde, living near Pune district."
    ],
    intent: "identity_location"
  },
  {
    id: 'vq-02',
    index: 2,
    questionText: {
      en: "What is your highest educational qualification?",
      hi: "आपकी उच्चतम शिक्षा कहाँ तक हुई है?",
      mr: "आपले शिक्षण कितवीपर्यंत झाले आहे?"
    },
    expectedAnswers: [
      "मैंने दसवीं कक्षा पास की है।",
      "मी दहावी पास झालो आहे.",
      "I have passed 10th standard board exams."
    ],
    intent: "education"
  },
  {
    id: 'vq-03',
    index: 3,
    questionText: {
      en: "What work or livelihood are you doing right now?",
      hi: "आप अभी क्या काम करते हैं?",
      mr: "तुम्ही सध्या काय काम करता?"
    },
    expectedAnswers: [
      "मैं खेती में काम करता हूँ और कभी-कभी घरेलू बिजली की वायरिंग और पंखे रिपेयर करता हूँ।",
      "मी शेतात काम करतो आणि अधूनमधून गावातील विजेची वायरिंग, फॅन दुरुस्त करतो.",
      "Currently doing agricultural work along with informal electrical domestic wiring repair."
    ],
    intent: "current_livelihood"
  },
  {
    id: 'vq-04',
    index: 4,
    questionText: {
      en: "What skills or tools do you already know how to handle?",
      hi: "आपको कौन-से काम, औजार या मशीन चलाने का अनुभव है?",
      mr: "तुम्हाला कोणती कामे, उपकरणे किंवा यंत्रे हाताळण्याचा अनुभव आहे?"
    },
    expectedAnswers: [
      "मुझे बेसिक बिजली का काम, वायरिंग और मोटर पंप चलाना आता है।",
      "मला बेसिक इलेक्ट्रिकल वायरिंग, ट्यूबलाईट जोडणी आणि शेतीची अवजारे हाताळता येतात.",
      "I can handle basic electrical tools, wiring circuits, switches, and farm water pumps."
    ],
    intent: "existing_skills"
  },
  {
    id: 'vq-05',
    index: 5,
    questionText: {
      en: "Which sector or new technology excites you to learn more about?",
      hi: "आप किस नए क्षेत्र या तकनीक में काम सीखना चाहते हैं?",
      mr: "तुम्हाला कोणत्या नव्या क्षेत्रात किंवा तंत्रज्ञानात काम शिकायला आवडेल?"
    },
    expectedAnswers: [
      "मुझे सोलर सिस्टम और नए कृषि उपकरणों के बारे में सीखने में बहुत रुचि है।",
      "मला सोलर पॅनेल, सोलर पंप आणि नवीन इलेक्ट्रॉनिक उपकरणांबद्दल शिकायला आवडेल.",
      "I am very interested in solar panels, clean energy technology, and electrical maintenance."
    ],
    intent: "interests"
  },
  {
    id: 'vq-06',
    index: 6,
    questionText: {
      en: "Do you prefer a monthly salary job or starting your own small enterprise?",
      hi: "आप महीने की पगार वाली नौकरी चाहते हैं या खुद का छोटा उद्यम/काम?",
      mr: "तुम्हाला महिन्याच्या पगाराची नोकरी हवी आहे की स्वतःचा छोटा व्यवसाय?"
    },
    expectedAnswers: [
      "मैं निश्चित पगार वाली नौकरी चाहता हूँ, ताकि परिवार को सहारा मिले।",
      "मला सुरुवातीला महिना पगाराची नोकरी हवी आहे, नंतर स्वतःचं दुकान सुरू करायचं आहे.",
      "I prefer wage employment with a regular salary, with future self-employment potential."
    ],
    intent: "employment_preference"
  },
  {
    id: 'vq-07',
    index: 7,
    questionText: {
      en: "How far are you able to travel daily for training and work?",
      hi: "प्रशिक्षण या काम के लिए आप कितनी दूर तक जा सकते हैं?",
      mr: "प्रशिक्षण किंवा कामासाठी तुम्ही किती अंतरापर्यंत प्रवास करू शकता?"
    },
    expectedAnswers: [
      "मैं २० किलोमीटर के दायरे में आने-जाने में सक्षम हूँ।",
      "मी रोज १५ ते २० किलोमीटर अंतरापर्यंत आरामात जाऊ शकतो.",
      "I can travel within 20 km daily."
    ],
    intent: "mobility"
  },
  {
    id: 'vq-08',
    index: 8,
    questionText: {
      en: "Excellent! We have gathered your journey details. Ready to discover your livelihood path?",
      hi: "बहुत बढ़िया! हमने आपकी पूरी जानकारी समझ ली है। क्या हम आपकी आजीविका का मार्ग देखें?",
      mr: "खूप छान! आम्ही तुमची संपूर्ण माहिती समजून घेतली आहे. तुमचा आजीविका मार्ग पाहण्यासाठी तयार आहात?"
    },
    expectedAnswers: [
      "हाँ, कृपया मुझे उपयुक्त ट्रेनिंग और आजीविका का रास्ता बताएं!",
      "हो, मला माझा कौशल्य आणि आजीविका मार्ग पाहायचा आहे!",
      "Yes, please show me my livelihood pathway!"
    ],
    intent: "confirmation"
  }
];

export const mockQuestions = mockVoiceQuestions;

export const sampleVoiceTranscripts = {
  mr: [
    "माझं नाव रामेश्वर शिंदे आहे, मी पुण्यात राहतो.",
    "मी दहावी पास झालो आहे.",
    "मी शेतात काम करतो आणि अधूनमधून गावातील विजेची वायरिंग, फॅन दुरुस्त करतो.",
    "मला बेसिक इलेक्ट्रिकल वायरिंग, ट्यूबलाईट जोडणी आणि शेतीची अवजारे हाताळता येतात.",
    "मला सोलर पॅनेल, सोलर पंप आणि नवीन इलेक्ट्रॉनिक उपकरणांबद्दल शिकायला आवडेल.",
    "मला सुरुवातीला महिना पगाराची नोकरी हवी आहे, नंतर स्वतःचं दुकान किंवा सेवा केंद्र सुरू करायचं आहे.",
    "मी रोज १५ ते २० किलोमीटर अंतरापर्यंत आरामात जाऊ शकतो.",
    "हो, मला माझा कौशल्य आणि आजीविका मार्ग पाहायचा आहे!"
  ],
  hi: [
    "मेरा नाम रामेश्वर शिंदे है, मैं पुणे के पास रहता हूँ।",
    "मैंने दसवीं कक्षा पास की है।",
    "मैं खेती में काम करता हूँ और कभी-कभी घरेलू बिजली की वायरिंग और पंखे रिपेयर करता हूँ।",
    "मुझे बेसिक बिजली का काम, वायरिंग और मोटर पंप चलाना आता है।",
    "मुझे सोलर सिस्टम और नए कृषि उपकरणों के बारे में सीखने में बहुत रुचि है।",
    "मैं निश्चित पगार वाली नौकरी चाहता हूँ, ताकि परिवार को सहारा मिले।",
    "मैं २० किलोमीटर के दायरे में आने-जाने में सक्षम हूँ।",
    "हाँ, कृपया मुझे उपयुक्त ट्रेनिंग और आजीविका का रास्ता बताएं!"
  ],
  en: [
    "My name is Rameshwar Shinde, living near Pune district.",
    "I have passed 10th standard board exams.",
    "Currently doing agricultural work along with informal electrical domestic wiring repair.",
    "I can handle basic electrical tools, wiring circuits, switches, and farm water pumps.",
    "I am very interested in solar panels, clean energy technology, and electrical maintenance.",
    "I prefer wage employment with a regular salary, with future self-employment potential.",
    "I can travel within 20 km daily.",
    "Yes, please show me my livelihood pathway!"
  ]
};

export const initialVoiceSession: VoiceSession = {
  sessionId: 'sess-sih-2026-001',
  language: 'hi',
  currentQuestionIndex: 3,
  totalQuestions: 8,
  state: 'idle',
  activeQuestion: "आप अभी क्या काम करते हैं?",
  messages: [
    {
      id: 'msg-1',
      sender: 'assistant',
      text: "नमस्ते! कौशल साथी में आपका स्वागत है। आपका नाम क्या है और आप कहाँ रहते हैं?",
      timestamp: '10:00 AM'
    },
    {
      id: 'msg-2',
      sender: 'user',
      text: "मेरा नाम रामेश्वर शिंदे है, मैं पुणे के पास रहता हूँ।",
      timestamp: '10:01 AM'
    },
    {
      id: 'msg-3',
      sender: 'assistant',
      text: "आपकी उच्चतम शिक्षा कहाँ तक हुई है?",
      timestamp: '10:01 AM'
    },
    {
      id: 'msg-4',
      sender: 'user',
      text: "मैंने दसवीं कक्षा पास की है।",
      timestamp: '10:02 AM'
    },
    {
      id: 'msg-5',
      sender: 'assistant',
      text: "आप अभी क्या काम करते हैं?",
      timestamp: '10:02 AM'
    }
  ],
  isComplete: false,
  startedAt: '2026-03-29T10:00:00Z'
};
