// This is a static preview build: there's no backend to receive form submissions.
// Any POST form on the page is redirected to the visitor's email client instead,
// with the filled-in fields pre-filled into the message body.
document.querySelectorAll('form[method="post" i]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const to = form.dataset.mailto || 'resumes@mangalamjobs.com';
    const data = new FormData(form);
    const lines = [];
    for (const [key, value] of data.entries()) {
      if (key === 'csrf_token' || key === 'website' || value instanceof File) continue;
      if (!value) continue;
      lines.push(`${key}: ${value}`);
    }
    const subject = encodeURIComponent('Website enquiry — ' + document.title.split('|')[0].trim());
    const body = encodeURIComponent(
      lines.join('\n') + '\n\n(Sent from the static preview of the Mangalam Jobs website.)'
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
});
