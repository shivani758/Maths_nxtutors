export function formatWhatsAppNumber(value) {
  return String(value ?? "").replace(/\D/g, "");
}

export function buildWhatsAppUrl(number, message) {
  const sanitizedNumber = formatWhatsAppNumber(number);
  const text = encodeURIComponent(message ?? "");
  return `https://wa.me/${sanitizedNumber}?text=${text}`;
}

export function buildStudentMessage(contact, payload) {
  return [
    "Hello Maths Bodhi, I want student support.",
    `Student name: ${payload.studentName}`,
    `Parent name: ${payload.parentName}`,
    `Phone: ${payload.phone}`,
    `Class or level: ${payload.classLevel}`,
    `Board: ${payload.board}`,
    `Preferred sector: ${payload.sector}`,
    `Topics: ${payload.topics}`,
    `Mode: ${payload.mode}`,
    `Goal: ${payload.goal}`,
    `Preferred timing: ${payload.timing}`,
    `Please connect me on WhatsApp through ${contact.phoneDisplay}.`,
  ].join("\n");
}

export function buildTutorMessage(contact, payload) {
  return [
    "Hello Maths Bodhi, I want to onboard as a tutor.",
    `Tutor name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Experience: ${payload.experience}`,
    `Boards: ${payload.boards}`,
    `Topics: ${payload.topics}`,
    `Preferred sectors: ${payload.sectors}`,
    `Availability: ${payload.availability}`,
    `About: ${payload.summary}`,
    `Please connect me on WhatsApp through ${contact.phoneDisplay}.`,
  ].join("\n");
}

export function buildDemoMessage(contact, payload) {
  return [
    "Hello Maths Bodhi, I want to book a maths demo class.",
    `Name: ${payload.name}`,
    `Phone: ${payload.phone}`,
    `Class or level: ${payload.classLevel}`,
    `Board: ${payload.board}`,
    `Sector: ${payload.sector}`,
    `Topic need: ${payload.topicNeed}`,
    `Preferred tutor: ${payload.preferredTutor}`,
    `Preferred mode: ${payload.mode}`,
    `Please connect me on WhatsApp through ${contact.phoneDisplay}.`,
  ].join("\n");
}

export function buildTutorInquiryMessage(contact, tutor, studentProfile) {
  return [
    `Hello Maths Bodhi, I want to enquire about ${tutor.name}.`,
    `Tutor focus: ${tutor.title}`,
    `Student name: ${studentProfile.studentName || "Not shared"}`,
    `Class or level: ${studentProfile.classLevel || "Not shared"}`,
    `Board: ${studentProfile.board || "Not shared"}`,
    `Preferred sector: ${studentProfile.sector || "Not shared"}`,
    `Please coordinate the WhatsApp conversation through ${contact.phoneDisplay}.`,
  ].join("\n");
}

