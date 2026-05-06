# 🌿 VitalTrack: Personalized Life Assistant

> **"A holistic mobile health companion built with React Native and Firebase, designed to automate daily wellness tracking, nutritional analysis, and contextual reminders."**

![Repo Size](https://img.shields.io/github/repo-size/emineugurlu/hatirlatici-app?color=ff6b6b&style=flat-square)
![Firebase](https://img.shields.io/badge/Backend-Firebase-ffca28?style=flat-square&logo=firebase)
![API](https://img.shields.io/badge/Weather-OpenWeatherMap-orange?style=flat-square)

VitalTrack is more than a reminder app; it is a **Context-Aware Personal Assistant**. Originally developed to support a family member's daily routine, the application integrates multiple data streams—including real-time weather analytics and nutritional data—to provide personalized recommendations. By leveraging **Firebase** for real-time synchronization and **AsyncStorage** for offline resilience, it ensures a seamless user experience for health and habit tracking.

---

## 🚀 Engineering Mindset

This project implements **Feature-Rich Mobile Systems**:

*   **Real-Time Data Persistence:** Utilizing **Firebase Firestore** and **Authentication** to manage secure user profiles and persistent health logs across devices.
*   **Contextual API Integration:** Fetching real-time meteorological data via **OpenWeatherMap API** to drive a conditional logic engine for outfit suggestions.
*   **Nutritional Logic Engine:** Implementing a daily calorie counter that analyzes meal types and identifies nutritional patterns to provide actionable health tips.
*   **Offline-First Strategy:** Using **AsyncStorage** for local caching, ensuring the application remains functional and responsive in low-connectivity environments.
*   **Declarative Form Architecture:** Leveraging **Formik** and **Yup** for robust schema validation in user profiles and meal logging.

## 🌟 Key Features

*   💧 **Hydration Tracking:** Visual progress indicators for daily water intake goals.
*   🍽️ **Smart Nutrition:** Integrated calorie counter with meal categorization and unhealthy food detection.
*   🌡️ **Weather-Driven Insights:** Automated outfit recommendations based on city-specific temperature and conditions.
*   📝 **Dynamic User Profiles:** Personalized experience based on age, gender, and biological metrics.

## 🔧 Technical Stack

*   **Framework:** React Native (Navigation, Hooks).
*   **Backend & Auth:** Firebase (Firestore, Auth).
*   **APIs:** OpenWeatherMap API.
*   **Validation:** Formik & Yup.

## 📸 Visual Showcase

![VitalTrack Home](https://github.com/user-attachments/assets/7f8c9dc7-a42a-4e2b-bbc6-6202644f62aa)
![Hydration View](https://github.com/user-attachments/assets/b31a6a06-78cd-4035-8201-6d4b68d9e418)
![Calorie Counter](https://github.com/user-attachments/assets/27374d42-7bf6-4b34-b0c3-af29b1214692)
![Weather Suggestions](https://github.com/user-attachments/assets/2cff56d2-2592-44e0-aba1-f24a2d5752bf)

---

## 🛠️ Installation
```bash
git clone [https://github.com/emineugurlu/hatirlatici-app](https://github.com/emineugurlu/hatirlatici-app)
cd hatirlatici-app
npm install
npm run android
````
Developed with care by Emine Uğurlu Computer Engineer.
