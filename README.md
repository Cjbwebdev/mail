This is a single-page mail application built as part of the CS50 Web Programming with Python and JavaScript course. It mimics the basic features of an email client like Gmail, using Django on the backend and JavaScript on the frontend.

---

## 🚀 Features

- 📥 View Inbox, Sent, and Archived mailboxes
- 📝 Compose and send new emails
- 📨 Read individual email messages
- 📂 Archive and unarchive messages
- 🔄 Mark emails as read
- 📡 Asynchronous JavaScript interactions (AJAX)

---

## 🛠 Technologies Used

- **Frontend:**
  - HTML
  - CSS
  - JavaScript (ES6+)
  - Bootstrap

- **Backend:**
  - Python
  - Django

- **Data:**
  - SQLite (default for development)

---

## ▶️ How to Run Locally

1. **Clone the repo:**
   ```bash
   git clone https://github.com/YOUR_USERNAME/mail.git
   cd mail
Install dependencies:
(Use a virtual environment if preferred)

bash
Copy
Edit
pip install -r requirements.txt
Apply migrations:

bash
Copy
Edit
python manage.py migrate
Run the development server:

bash
Copy
Edit
python manage.py runserver
Open in browser:
Visit http://localhost:8000 in your browser

📸 Screenshots
You can add screenshots of the Inbox, Compose screen, and Email view here.

📁 Project Structure
graphql
Copy
Edit
mail/
├── mail/             # Django app with views, URLs, and models
├── static/           # JavaScript and CSS files
├── templates/        # HTML templates
├── manage.py
└── README.md
✅ Requirements Met (per CS50 spec)
✔️ Compose email functionality

✔️ Load mailbox views dynamically

✔️ View and mark email as read

✔️ Archive/unarchive functionality

✔️ Fully client-side JS interactivity

🙋‍♂️ Author
Built by Curtis Booth as part of the Harvard CS50W course.


📜 License
This project is licensed for educational use under the terms of the CS50 Academic Honesty Policy.



 
 
