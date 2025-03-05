<svelte:head>
  <title>Contact Me</title>
</svelte:head>

<h1>Contact</h1>
<link rel="stylesheet" href="../style.css">

<form action="mailto:shreya22@mit.edu" method="POST" enctype="text/plain" class="contact-form">
    <div class="form-row">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Your Email" required>
    </div>
    <div class="form-row">
        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Subject" required>
    </div>
    <div class="form-row">
        <label for="message">Message</label>
        <textarea id="message" name="message" placeholder="Your Message" rows="5" required></textarea>
    </div>
    <div class="form-row">
        <button type="submit" class="submit-btn">Send Message</button>
    </div>
</form>