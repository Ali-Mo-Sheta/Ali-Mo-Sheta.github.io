(() => {
  const loadingScreen = document.querySelector('#loading-screen');
  const loadingStartedAt = performance.now();
  let loadingRemoved = false;
  const removeLoadingScreen = () => {
    if (!loadingScreen || loadingRemoved) return;
    loadingRemoved = true;
    if (window.gsap) {
      window.gsap.to(loadingScreen, {
        autoAlpha: 0,
        duration: 0.35,
        ease: 'power2.out',
        onComplete: () => loadingScreen.remove()
      });
    } else {
      loadingScreen.remove();
    }
  };

  if (loadingScreen) {
    const loadingFallback = window.setTimeout(removeLoadingScreen, 4200);
    window.addEventListener('load', () => {
      window.clearTimeout(loadingFallback);
      const minimumDisplayTime = 1900;
      const elapsed = performance.now() - loadingStartedAt;
      window.setTimeout(removeLoadingScreen, Math.max(0, minimumDisplayTime - elapsed));
    }, { once: true });
  }

  const heroName = document.querySelector('.hero-name-backdrop');
  if (heroName && window.gsap && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.gsap.fromTo(heroName,
      { opacity: 0, y: 18, rotateY: -18 },
      { opacity: 0.1, y: 0, rotateY: -12, duration: 1.4, delay: 0.25, ease: 'power3.out' }
    );
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  const dialog = document.querySelector('#project-dialog');
  const dialogTitle = document.querySelector('#dialog-title');
  const dialogContent = document.querySelector('#dialog-content');

  const projectNotes = {
    heart: {
      title: 'Heart Attack Prediction & Classification',
      body: `
        <p>This project explored a tabular classification workflow using a dataset containing more than 70,000 records. The aim was to practice the steps that surround a model, not just fit an estimator.</p>
        <ul>
          <li>Exploratory data analysis to understand distributions and data quality.</li>
          <li>Preprocessing and feature engineering before modeling.</li>
          <li>Comparison of Random Forest and Support Vector Machine approaches.</li>
          <li>Review of model behavior and evaluation rather than relying on a single score.</li>
        </ul>
        <div class="dialog-note">This was a learning project using a dataset, not a validated clinical tool. No medical decisions should be based on it.</div>
      `
    },
    pos: {
      title: 'Desktop POS & Cashier Application',
      body: `
        <p>I contributed to a team project building a desktop application for point-of-sale work. It was a useful exercise in moving beyond notebooks and thinking about software people use to complete everyday tasks.</p>
        <ul>
          <li>Contributed to a desktop cashier application and its business workflow.</li>
          <li>Worked in a team setting, connecting application behavior with sales-related tasks.</li>
          <li>Learned to think about usability and reliability alongside code.</li>
        </ul>
        <div class="dialog-note">I’m not presenting this as a solo-built product. The published portfolio describes my participation; source code and detailed implementation notes are not linked here.</div>
      `
    }
  };

  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'Open navigation');
        nav.classList.remove('is-open');
      });
    });
  }

  document.querySelectorAll('.detail-trigger').forEach((button) => {
    button.addEventListener('click', () => {
      const note = projectNotes[button.dataset.project];
      if (!note || !dialog || typeof dialog.showModal !== 'function') return;
      dialogTitle.textContent = note.title;
      dialogContent.innerHTML = note.body;
      dialog.showModal();
    });
  });

  document.querySelectorAll('.dialog-close').forEach((button) => {
    button.addEventListener('click', () => dialog.close());
  });

  if (dialog) {
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealSelectors = [
    '.hero-copy',
    '.hero-photo',
    '#about .section-grid',
    '#services .services-heading-row',
    '#work .work-heading-row',
    '#skills .toolkit-head',
    '#certificates .certificates-heading-row',
    '#education .section-grid',
    '#contact .contact-info',
    '#contact .contact-form-column'
  ];
  const staggerSelectors = [
    '#work .project-card',
    '#services .service-card',
    '#skills .toolkit-group',
    '#certificates .certificate-card',
    '#education .timeline-item',
    '#about .about-focus-item'
  ];
  const headingSelectors = [
    '.hero h1',
    '.section-heading',
    '#contact .contact-info h1',
    '#contact .contact-form-heading h3'
  ];
  const revealElements = revealSelectors.flatMap((selector) => [...document.querySelectorAll(selector)]);
  const staggerGroups = staggerSelectors.map((selector) => [...document.querySelectorAll(selector)]).filter((group) => group.length > 0);
  const staggerElements = staggerGroups.flat();
  const headingElements = headingSelectors.flatMap((selector) => [...document.querySelectorAll(selector)]);
  const dividerElements = [...document.querySelectorAll('.index-line')];
  const allRevealElements = [...new Set([...revealElements, ...staggerElements, ...headingElements, ...dividerElements])];
  allRevealElements.forEach((element) => element.classList.add('reveal-on-scroll'));

  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);
    const reveal = (element, options = {}) => {
      window.gsap.fromTo(element,
        { autoAlpha: 0, y: options.y ?? 36, scale: options.scale ?? .97 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: options.duration ?? .7,
          delay: options.delay ?? 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            end: 'bottom 12%',
            toggleActions: 'restart none restart reset',
            invalidateOnRefresh: true
          }
        }
      );
    };

    revealElements.forEach((element) => reveal(element));
    headingElements.forEach((element) => reveal(element, { y: 28, scale: .98, duration: .65 }));
    dividerElements.forEach((element) => {
      window.gsap.fromTo(element, { scaleX: 0 }, {
        scaleX: 1,
        duration: .65,
        ease: 'power2.out',
        transformOrigin: 'left center',
        scrollTrigger: {
          trigger: element,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'restart none restart reset'
        }
      });
    });
    staggerGroups.forEach((group) => {
      group.forEach((element, index) => reveal(element, {
        y: 42,
        scale: .965,
        duration: .7 + Math.min(index * .04, .12),
        delay: index * .1
      }));
      group.forEach((element, index) => {
        element.style.setProperty('--reveal-index', index);
      });
    });
  } else if (reducedMotion || !('IntersectionObserver' in window)) {
    allRevealElements.forEach((element) => element.classList.add('is-revealed'));
  } else {
    allRevealElements.forEach((element) => element.classList.add('reveal-on-scroll'));
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => entry.target.classList.toggle('is-revealed', entry.isIntersecting));
    }, { threshold: 0.05, rootMargin: '0px 0px -40px 0px' });
    allRevealElements.forEach((element) => revealObserver.observe(element));
  }

  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!reducedMotion && finePointer) {
    document.querySelectorAll('#work .project-card').forEach((card) => {
      card.classList.add('tilt-enabled');
      let frameId = 0;

      card.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse' && event.pointerType !== 'pen') return;
        if (frameId) cancelAnimationFrame(frameId);
        frameId = requestAnimationFrame(() => {
          const bounds = card.getBoundingClientRect();
          const x = (event.clientX - bounds.left) / bounds.width - .5;
          const y = (event.clientY - bounds.top) / bounds.height - .5;
          card.style.setProperty('--tilt-x', `${(x * 2.2).toFixed(2)}deg`);
          card.style.setProperty('--tilt-y', `${(y * -2.2).toFixed(2)}deg`);
        });
      });

      card.addEventListener('pointerleave', () => {
        if (frameId) cancelAnimationFrame(frameId);
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });
  }

  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    const status = document.querySelector('#contact-form-status');
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const submitLabel = contactForm.querySelector('.submit-label');
    const fallbackEmail = 'alisheta550@gmail.com';
    const nameField = contactForm.querySelector('#contact-name');
    const emailField = contactForm.querySelector('#contact-email');
    const subjectField = contactForm.querySelector('#contact-subject');
    const messageField = contactForm.querySelector('#contact-message');
    let isSubmitting = false;

    const setStatus = (message, state = '') => {
      if (!status) return;
      status.classList.remove('is-success', 'is-error');
      if (state) status.classList.add(`is-${state}`);
      status.textContent = message;
    };

    const validateContactForm = () => {
      [nameField, emailField, subjectField, messageField].forEach((field) => field?.setCustomValidity(''));
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;      const name = nameField?.value.trim() || '';
      const email = emailField?.value.trim() || '';
      const subject = subjectField?.value.trim() || '';
      const message = messageField?.value.trim() || '';

      if (!name) nameField?.setCustomValidity('Please enter your name.');
      if (!email) emailField?.setCustomValidity('Please enter your email address.');
      else if (!emailPattern.test(email)) emailField?.setCustomValidity('Please enter a valid email address.');
      if (!subject) subjectField?.setCustomValidity('Please enter a subject.');
      if (!message) messageField?.setCustomValidity('Please enter a message.');

      const valid = contactForm.reportValidity();
      if (!valid) {
        const invalidField = contactForm.querySelector(':invalid');
        setStatus(invalidField === emailField ? 'Please enter a valid email address.' : 'Please complete all required fields.', 'error');
      }
      return valid;
    };

    [nameField, emailField, subjectField, messageField].forEach((field) => {
      field?.addEventListener('input', () => field.setCustomValidity(''));
    });

    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (isSubmitting) return;
      if (!validateContactForm()) return;

      const fields = new FormData(contactForm);
      // Quietly ignore obvious bot submissions caught by the honeypot field.
      if (String(fields.get('_honey') || '').trim()) return;

      const name = String(fields.get('name') || '').trim();
      const email = String(fields.get('email') || '').trim();
      const subject = String(fields.get('subject') || '').trim();
      const message = String(fields.get('message') || '').trim();
      const emailSubject = `Portfolio message: ${subject}`;

      isSubmitting = true;
      setStatus('Sending your message…');
      if (submitButton) submitButton.disabled = true;
      if (submitLabel) submitLabel.textContent = 'Sending…';

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${fallbackEmail}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
            _subject: emailSubject,
            _replyto: email,
            _template: 'table',
            _honey: ''
          })
        });
        const result = await response.json();
        const succeeded = response.ok && (result.success === true || result.success === 'true');
        if (!succeeded) throw new Error('The form service did not confirm delivery.');
        setStatus('Message sent successfully!', 'success');
        contactForm.reset();
      } catch (error) {
        setStatus('Your message could not be sent. Please try again; your form entries are still here.', 'error');
      } finally {
        isSubmitting = false;
        if (submitButton) submitButton.disabled = false;
        if (submitLabel) submitLabel.textContent = 'Send message';
      }
    });
  }

  const year = document.querySelector('#year');
  if (year) year.textContent = String(new Date().getFullYear());
})();
