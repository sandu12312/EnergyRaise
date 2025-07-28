# EnergyRaise

EnergyRaise este o aplicație mobilă (Android/iOS) pentru echilibru emoțional și energetic, prin remedii naturale și suport psihologic.

## Descriere Detaliată

EnergyRaise este o platformă completă dedicată bunăstării emoționale și energetice, oferind utilizatorilor instrumente personalizate pentru gestionarea stărilor emoționale prin remedii naturale și acces la suport psihologic profesionist.

### Funcționalități Principale

1. **Selectare Emoție + Fișă de recomandări**

   - Interfață intuitivă pentru selectarea stării emoționale curente (din 34 de emoții predefinite)
   - Recomandări personalizate de remedii naturale: ceaiuri, tincturi, uleiuri esențiale, capsule
   - Informații despre chakre asociate, alimente benefice și cristale recomandate
   - Integrare marketing afiliat pentru produsele recomandate
   - Sursă date: Firebase
   - Quiz inițial pentru identificarea emoției dominante (pentru utilizatorii care nu știu exact ce simt)

2. **My Energy Log**

   - Jurnal zilnic pentru monitorizarea stării emoționale și energetice
   - Tracking nivel energie, emoții predominante
   - Sistem de checkbox-uri pentru activități/rutine zilnice
   - Afirmații pozitive personalizate
   - Note personale și asociere cu chakre
   - Salvare date în Firebase
   - Sistem de notificări zilnice pentru completarea jurnalului
   - Quiz zilnic cu 3 întrebări pentru monitorizarea stării emoționale

3. **Daily Boost**

   - Generator zilnic de recomandări pentru starea de bine
   - Afirmații pozitive personalizate în funcție de starea emoțională
   - Recomandări de ceaiuri și uleiuri esențiale
   - Sunete Solfeggio pentru armonizare
   - Tehnici de respirație
   - Cristale pentru echilibrare energetică
   - Bibliotecă predefinită de resurse
   - Personalizare în funcție de rezultatele quiz-ului zilnic

4. **Healing Sounds**

   - Colecție de sunete Solfeggio și ambientale
   - Player audio integrat sau link-uri către YouTube
   - Organizare pe categorii și beneficii

5. **My Energy Map** (faza 2)

   - Calendar emoțional interactiv
   - Grafice de evoluție a nivelului energetic
   - Analiză a emoțiilor frecvente
   - Monitorizare chakre
   - Culoare predominantă pentru vizualizarea stării generale

6. **Marketplace Psihologi**
   - Platformă de conectare cu terapeuți verificați
   - Profile detaliate ale terapeuților
   - Sistem de filtrare avansat
   - Chat intern securizat
   - Programare și desfășurare ședințe online (integrare cu Zoom/Google Meet)
   - Sistem de plată integrat prin Stripe
   - Proces de aprobare a conturilor pentru terapeuți (verificare diplomă)
   - Sistem de review-uri (disponibil după min. 2 ședințe sau 1 săptămână de mesaje)
   - Comision de 25% din prețul ședințelor sau al pachetelor de mesaje

### Structura Quiz-urilor

#### Quiz Inițial (7 întrebări)

- Format: 7 întrebări cu alegere multiplă (1 răspuns/întrebare)
- La final: scor calculat → emoție dominantă (din cele 34) + sugestie de Daily Boost

#### Quiz Zilnic (3 întrebări)

- Întrebări despre starea emoțională curentă, nivelul de energie și nevoile zilei
- Rezultat: identificarea stării dominante și Daily Boost personalizat
- Monitorizare pentru a detecta schimbările în starea emoțională

### Monetizare

1. **Model Freemium**

   - Versiune basic gratuită cu set limitat de recomandări
   - Versiune premium cu acces la recomandări extinse și funcționalități suplimentare
   - Abonamente lunare sau anuale

2. **Marketing Afiliat**

   - Link-uri de achiziție pentru produsele recomandate
   - Comision din vânzările generate

3. **Marketplace Psihologi**
   - Comision de 25% din prețul ședințelor sau pachetelor de mesaje
   - Opțiuni de promovare pentru terapeuți (poziționare prioritară în căutări)

### Tech Stack

#### Frontend

- React Native CLI
- TypeScript
- Tailwind CSS / Styled Components
- Fonturi: Nunito / Inter

#### Backend & Servicii

- Firebase
  - Authentication
  - Firestore
  - Realtime Database
  - Cloud Functions
- Player audio: react-native-sound / react-native-video
- Plăți: Stripe SDK
- Integrare Zoom/Google Meet pentru ședințe online

#### Stocare Date

- Firebase Firestore (date utilizator)
- Stocare locală + sincronizare cloud

### Design & UX

- Stil: calm, modern, relaxant
- Paletă de culori: verde salvie, crem, lavandă
- Experiență utilizator intuitivă și fluidă

### Funcționalități Suplimentare

- Autentificare cu email sau cont guest
- Salvare locală cu sincronizare în cloud
- Conformitate GDPR și sistem de consimțământ
- Panou administrativ pentru aprobarea terapeuților (GitHub Pages)

## Faze de Dezvoltare

1. **Faza 1**: Funcționalitățile de bază 1-4
2. **Faza 2**: My Energy Map și optimizări
3. **Faza 3**: Marketplace Psihologi și integrare completă
