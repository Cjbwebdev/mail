document.addEventListener('DOMContentLoaded', function() {

  // Use buttons to toggle between views
  document.querySelector('#inbox').addEventListener('click', () => load_mailbox('inbox'));
  document.querySelector('#sent').addEventListener('click', () => load_mailbox('sent'));
  document.querySelector('#archived').addEventListener('click', () => load_mailbox('archive'));
  document.querySelector('#compose').addEventListener('click', compose_email);

// Submit handler
document.querySelector("#compose-form").addEventListener('submit', send_email);


  // By default, load the inbox
  load_mailbox('inbox');
  
});

function compose_email() {

  // Show compose view and hide other views
  document.querySelector('#emails-view').style.display = 'none';
  document.querySelector('#compose-view').style.display = 'block';
  document.querySelector('#email-detail-view').style.display = 'none';

  // Clear out composition fields
  document.querySelector('#compose-recipients').value = '';
  document.querySelector('#compose-subject').value = '';
  document.querySelector('#compose-body').value = '';
}

function view_email(id){
  fetch(`/emails/${id}`)
  .then(response => response.json())
  .then(email => {
    // Display the email details
    document.querySelector('#emails-view').style.display = 'none';
    document.querySelector('#compose-view').style.display = 'none';
    document.querySelector('#email-detail-view').style.display = 'block';
    
    document.querySelector('#email-detail-view').innerHTML = `
      <ul class="list-group">
        <li class="list-group-item"><strong>From:</strong> ${email.sender}</li>
        <li class="list-group-item"><strong>To:</strong> ${email.recipients}</li>
        <li class="list-group-item"><strong>Subject:</strong> ${email.subject}</li>
        <li class="list-group-item"><strong>Timestamp:</strong> ${email.timestamp}</li>
        <li class="list-group-item">${email.body}</li>
      </ul>`;

    // Mark as read
    if (!email.read) {
      fetch(`/emails/${email.id}`, {
        method: 'PUT',
        body: JSON.stringify({ read: true })
      });
    }

    // Add Archive / Unarchive button
    const btn_arch = document.createElement('button');
    btn_arch.innerHTML = email.archived ? "Unarchive" : "Archive";
    btn_arch.className = email.archived ? "btn btn-success m-2" : "btn btn-danger m-2";
    btn_arch.addEventListener('click', function () {
      fetch(`/emails/${email.id}`, {
        method: 'PUT',
        body: JSON.stringify({ archived: !email.archived })
      }).then(() => {
        load_mailbox(email.archived ? 'inbox' : 'archive');
      });
    });
    document.querySelector('#email-detail-view').append(btn_arch);

    // ✅ Add Reply Button
    const btn_reply = document.createElement('button');
    btn_reply.innerHTML = "Reply";
    btn_reply.className = "btn btn-primary m-2";
    btn_reply.addEventListener('click', function () {
      reply_email(email);
    });
    document.querySelector('#email-detail-view').append(btn_reply);
  });
}

function load_mailbox(mailbox) {
  
  // Show the mailbox and hide other views
  document.querySelector('#emails-view').style.display = 'block';
  document.querySelector('#compose-view').style.display = 'none';

  // Show the mailbox name
  document.querySelector('#emails-view').innerHTML = `<h3>${mailbox.charAt(0).toUpperCase() + mailbox.slice(1)}</h3>`;

  //Get emial that have been sent to user from mailbox
  fetch(`/emails/${mailbox}`)
  .then(response => response.json())
  .then(emails => {
    // Loop through emails and create a div for each 
      emails.forEach(singleEmail => {

        console.log(singleEmail);

        // create div and display emials
        const newEmail = document.createElement('div');
        newEmail.className ="list-group-item";
        newEmail.innerHTML = `
        <h5>Sender: ${singleEmail.sender}</h5>
        <p>Subject: ${singleEmail.subject}</p>
        <p>${singleEmail.timestamp}</p>`;

        // Change background colour
        newEmail.className = singleEmail.read ? 'read': 'unread';
        //Add click event to view email
        newEmail.addEventListener('click', function(){
          view_email(singleEmail.id)
        }  );
        document.querySelector('#emails-view').append(newEmail);
      });
    // ... do something else with emails ...
});
}

function send_email(){
  event.preventDefault();

  // Store fields
  const recipients = document.querySelector('#compose-recipients').value;
  const subject = document.querySelector('#compose-subject').value;
  const body = document.querySelector('#compose-body').value;

  // Send data to backend 
  fetch('/emails', {
    method: 'POST',
    body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body
    })
  })
  .then(response => response.json())
  .then(result => {
      // Print result
      console.log(result);
      load_mailbox('sent');
  });
  localStorage.clear()
  load_mailbox('sent')
  return false;
}
 
function reply_email(email) {
  compose_email();

  // Fill in the reply form
  document.querySelector('#compose-recipients').value = email.sender;
  document.querySelector('#compose-subject').value =
    email.subject.startsWith("Re:") ? email.subject : `Re: ${email.subject}`;
  document.querySelector('#compose-body').value =
    `\n\nOn ${email.timestamp}, ${email.sender} wrote:\n${email.body}`;
}
