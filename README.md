# 🎬 CineVision 

## 🏢 Business Domain

**Entertainment • OTT Platforms • Streaming Services • Content Discovery**

---

## 🌍 Business Problem

Streaming platforms offer **thousands of movies and shows**, making it difficult for users to quickly discover content that matches their interests.

For example, a user who enjoyed **Avengers** may want movies with similar themes, genres, and storytelling style. Manually browsing a large catalog increases search time and often results in poor content discovery.

Traditional keyword search is limited because users usually want **movies that feel similar**, not just movies that contain the same words.

---

## 🎯 Business Objective

The Objective of the project is to build a **NLP-powered content recommendation system** that helps users discover relevant movies by analyzing movie descriptions and metadata. The system uses **TF-IDF vectorization** and **Cosine Similarity** to identify semantically similar movies and return the most relevant recommendations.

---

## 📊 Dataset Overview

The project uses a movie metadata dataset containing titles, genres, overviews, ratings, popularity, production details, and release information.

### 📌 Key Features Used

- `title`
- `genres`
- `overview`
- `tagline`
- `vote_average`
- `popularity`

### 🎯 Goal

Recommend movies that are **semantically similar** to the movie selected by the user.

---

## 🛠️ Tech Stack

| Category | Technologies |
|---|---|
| **Programming** | Python |
| **Data Analysis** | Pandas, NumPy |
| **Machine Learning / NLP** | Scikit-learn |
| **Backend API** | FastAPI |
| **Frontend** | React.js |
| **External API** | OMDb API |

---

## 📸 Project Preview

![CineVision UI](https://github.com/virtual-arin/CineVision/blob/main/client/public/screenshot.png)

---

## 📂 Project Structure

```text
CineVision/
├── client/                         # React.js frontend
│
├── server/                         # FastAPI backend
│   ├── models/
│   │   ├── df.pkl
│   │   ├── tfidf_matrix.pkl
│   │   ├── tfidf.pkl
│   │   └── indices.pkl
│   ├── data/
│   │   └── movies_data.csv
│   ├── notebook/
│   │   └── Notebook.ipynb
│   ├── main.py                     # FastAPI code
│   └── requirements.txt
│
├── .gitignore
├── LICENSE
└── README.md
```

---

## 🔄 Workflow

### 1️⃣ Data Cleaning & Feature Selection

- Removed duplicate records
- Handled missing values
- Selected relevant textual features

### 2️⃣ Text Preprocessing

- Combined important text fields
- Converted text to lowercase
- Removed noise and unnecessary characters

### 3️⃣ TF-IDF Vectorization

- Converted movie descriptions into numerical vectors
- Captured the importance of words across the dataset

### 4️⃣ Similarity Computation

- Calculated **Cosine Similarity** between TF-IDF vectors
- Identified semantically similar movies

### 5️⃣ Recommendation Engine

- Retrieved the **top-N most similar movies**
- Returned personalized recommendations

### 6️⃣ Backend API

- Built a **FastAPI REST API**
- Served recommendations efficiently

### 7️⃣ Frontend Integration

- Connected React frontend with FastAPI backend
- Displayed movie posters and metadata using the **OMDb API**

---

## 🚀 How to Run Locally

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/virtual-arin/CineVision
cd CineVision
```

### 2️⃣ Setup Backend

```bash
cd server
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on:

```text
http://127.0.0.1:8000
```

### 3️⃣ Setup Frontend

```bash
cd client
npm install
npm run dev
```

Frontend will run on:

```text
http://localhost:5173
```

---

## 🔑 API Setup (OMDb)

Get a free API key from:

🔗 https://www.omdbapi.com/apikey.aspx

Create a `.env` file inside the **server** folder:

```env
OMDB_API_KEY=YOUR_API_KEY
```

---

## 📈 Business Use Cases

- **Personalized movie discovery** for OTT users
- **Related-content recommendations** on movie detail pages
- **Reduced search effort** for users
- **Higher engagement and watch-time** through relevant suggestions

---

## 📊 Business Impact

- ✅ Enhances content discovery from large catalogs
- ✅ Increases user engagement through relevant recommendations
- ✅ Improves user experience by reducing browsing time
- ✅ Demonstrates a production-style NLP recommendation workflow
- ✅ Provides a scalable foundation for advanced recommendation systems

---

## 🧠 NLP Concepts Applied

- Text preprocessing
- Feature engineering
- TF-IDF vectorization
- Cosine similarity
- Content-based filtering
- Information retrieval

---