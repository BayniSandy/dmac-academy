// =============================================================================
// ██████╗ ███╗   ███╗ █████╗  ██████╗     █████╗  ██████╗ █████╗ ██████╗ ███████╗███╗   ███╗██╗   ██╗
// ██╔══██╗████╗ ████║██╔══██╗██╔════╝    ██╔══██╗██╔════╝██╔══██╗██╔══██╗██╔════╝████╗ ████║╚██╗ ██╔╝
// ██║  ██║██╔████╔██║███████║██║         ███████║██║     ███████║██║  ██║█████╗  ██╔████╔██║ ╚████╔╝
// ██║  ██║██║╚██╔╝██║██╔══██║██║         ██╔══██║██║     ██╔══██║██║  ██║██╔══╝  ██║╚██╔╝██║  ╚██╔╝
// ██████╔╝██║ ╚═╝ ██║██║  ██║╚██████╗    ██║  ██║╚██████╗██║  ██║██████╔╝███████╗██║ ╚═╝ ██║   ██║
// ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝     ╚═╝   ╚═╝
// =============================================================================
// COMPLETE BACKEND — Google Apps Script
// D-Maharlika Arnis Club | Grip. Strike. Rise.
// =============================================================================
// Deploy as Web App: Execute as ME, Access: Anyone
// =============================================================================


// ╔═══════════════════════════════════════════════════════════════╗
// ║  STEP 1: Paste your Google Sheet ID below                    ║
// ║  STEP 2: Run setupAllSheets() from the toolbar               ║
// ║  STEP 3: Deploy > New Deployment > Web App                   ║
// ╚═══════════════════════════════════════════════════════════════╝

const SPREADSHEET_ID = ''; // <-- PASTE YOUR GOOGLE SHEET ID HERE



// =============================================================================
// SECTION 1: MAIN ROUTER
// =============================================================================

function doGet(e) {
  return handleRequest(e, 'GET');
}

function doPost(e) {
  return handleRequest(e, 'POST');
}

function handleRequest(e, method) {
  try {
    const params = method === 'GET' ? e.parameter : JSON.parse(e.postData.contents || '{}');
    const action = params.action || e.parameter.action || '';

    let result;

    switch (action) {
      // === AUTH ===
      case 'register':         result = registerUser(params); break;
      case 'login':            result = loginUser(params); break;
      case 'forgot_password':  result = forgotPassword(params); break;
      case 'reset_password':   result = resetPassword(params); break;
      case 'verify_token':     result = verifyToken(params); break;

      // === PROFILE ===
      case 'get_profile':      result = getProfile(params); break;
      case 'update_profile':   result = updateProfile(params); break;
      case 'upload_photo':     result = uploadPhoto(params); break;

      // === SUBSCRIPTIONS ===
      case 'get_subscription':    result = getSubscription(params); break;
      case 'create_subscription': result = createSubscription(params); break;
      case 'cancel_subscription': result = cancelSubscription(params); break;
      case 'check_expiry':        result = checkExpiry(params); break;
      case 'start_free_trial':    result = startFreeTrial(params); break;

      // === PAYMENTS ===
      case 'create_payment':      result = createPayment(params); break;
      case 'verify_payment':      result = verifyPayment(params); break;
      case 'payment_webhook':     result = paymentWebhook(params); break;
      case 'get_payment_history': result = getPaymentHistory(params); break;

      // === COURSES / MODULES / LESSONS ===
      case 'get_modules':      result = getModules(params); break;
      case 'get_module':       result = getModule(params); break;
      case 'get_lessons':      result = getLessons(params); break;
      case 'get_lesson':       result = getLesson(params); break;

      // === QUIZZES ===
      case 'get_quiz':         result = getQuiz(params); break;
      case 'get_questions':    result = getQuizQuestions(params); break;
      case 'submit_quiz':      result = submitQuiz(params); break;

      // === PROGRESS ===
      case 'get_progress':     result = getProgress(params); break;
      case 'mark_lesson':      result = markLessonComplete(params); break;
      case 'get_dashboard':    result = getDashboardData(params); break;

      // === BOOKINGS ===
      case 'get_available_slots':  result = getAvailableSlots(params); break;
      case 'create_booking':       result = createBooking(params); break;
      case 'cancel_booking':       result = cancelBooking(params); break;
      case 'get_my_bookings':      result = getMyBookings(params); break;

      // === CERTIFICATES ===
      case 'get_certificates':    result = getCertificates(params); break;
      case 'generate_certificate': result = generateCertificate(params); break;
      case 'verify_certificate':   result = verifyCertificate(params); break;

      // === DAILY CONTENT ===
      case 'get_daily_quote':  result = getDailyQuote(); break;
      case 'get_daily_fact':   result = getDailyFact(); break;

      // === PROGRESS BOARD ===
      case 'get_progress_board': result = getProgressBoard(params); break;

      // === ADMIN ===
      case 'admin_get_users':       result = adminGetUsers(params); break;
      case 'admin_update_user':     result = adminUpdateUser(params); break;
      case 'admin_get_payments':    result = adminGetPayments(params); break;
      case 'admin_verify_payment':  result = adminVerifyPayment(params); break;
      case 'admin_add_module':      result = adminAddModule(params); break;
      case 'admin_update_module':   result = adminUpdateModule(params); break;
      case 'admin_add_lesson':      result = adminAddLesson(params); break;
      case 'admin_update_lesson':   result = adminUpdateLesson(params); break;
      case 'admin_add_quiz':        result = adminAddQuiz(params); break;
      case 'admin_add_question':    result = adminAddQuestion(params); break;
      case 'admin_manage_slots':    result = adminManageSlots(params); break;
      case 'admin_get_bookings':    result = adminGetBookings(params); break;
      case 'admin_update_booking':  result = adminUpdateBooking(params); break;
      case 'admin_add_quote':       result = adminAddQuote(params); break;
      case 'admin_add_fact':        result = adminAddFact(params); break;
      case 'admin_get_logs':        result = adminGetLogs(params); break;
      case 'admin_get_stats':       result = adminGetStats(params); break;

      // === SETUP (run once) ===
      case 'setup':            result = setupAllSheets(); break;

      default:
        result = { success: false, error: 'Unknown action: ' + action };
    }

    return jsonResponse(result);

  } catch (err) {
    return jsonResponse({ success: false, error: err.message, stack: err.stack });
  }
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}



// =============================================================================
// SECTION 2: UTILITIES — Shared helpers
// =============================================================================

// --- SPREADSHEET HELPERS ---

function getSheet(name) {
  return SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(name);
}

function getAllRows(sheetName) {
  const sheet = getSheet(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return [];
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  return data.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function findRow(sheetName, column, value) {
  const sheet = getSheet(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return null;
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const colIndex = headers.indexOf(column);
  if (colIndex === -1) return null;

  for (let i = 1; i < data.length; i++) {
    if (String(data[i][colIndex]).trim() === String(value).trim()) {
      const obj = { _rowIndex: i + 1 };
      headers.forEach((h, j) => obj[h] = data[i][j]);
      return obj;
    }
  }
  return null;
}

function findRows(sheetName, column, value) {
  const sheet = getSheet(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return [];
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const colIndex = headers.indexOf(column);
  if (colIndex === -1) return [];

  const results = [];
  for (let i = 1; i < data.length; i++) {
    if (String(data[i][colIndex]).trim() === String(value).trim()) {
      const obj = { _rowIndex: i + 1 };
      headers.forEach((h, j) => obj[h] = data[i][j]);
      results.push(obj);
    }
  }
  return results;
}

function updateRow(sheetName, rowIndex, column, value) {
  const sheet = getSheet(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const colIndex = headers.indexOf(column);
  if (colIndex === -1) return false;
  sheet.getRange(rowIndex, colIndex + 1).setValue(value);
  return true;
}

function updateMultipleColumns(sheetName, rowIndex, updates) {
  const sheet = getSheet(sheetName);
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  for (const [col, val] of Object.entries(updates)) {
    const colIndex = headers.indexOf(col);
    if (colIndex !== -1) {
      sheet.getRange(rowIndex, colIndex + 1).setValue(val);
    }
  }
  return true;
}

function appendRow_(sheetName, rowData) {
  const sheet = getSheet(sheetName);
  sheet.appendRow(rowData);
  return true;
}

function getNextId(prefix, sheetName, idColumn) {
  const sheet = getSheet(sheetName);
  if (!sheet || sheet.getLastRow() < 2) return prefix + '00001';
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 1).getValues();
  let maxNum = 0;
  data.forEach(row => {
    const id = String(row[0]);
    const num = parseInt(id.replace(prefix, ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });
  return prefix + String(maxNum + 1).padStart(5, '0');
}


// --- PASSWORD HASHING ---

function hashPassword(password) {
  const rawHash = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, password + 'DMAC_SALT_2027');
  return rawHash.map(b => ('0' + (b & 0xFF).toString(16)).slice(-2)).join('');
}

function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}


// --- SESSION TOKEN ---

function generateToken() {
  return Utilities.getUuid().replace(/-/g, '') + Date.now().toString(36);
}

function generateResetToken() {
  return Utilities.getUuid().replace(/-/g, '').substring(0, 20).toUpperCase();
}

function generateVerificationCode() {
  return 'DMAC-' + Utilities.getUuid().replace(/-/g, '').substring(0, 8).toUpperCase();
}


// --- AUTH MIDDLEWARE ---

function authenticateUser(params) {
  const token = params.token || '';
  if (!token) return null;

  const parts = token.split(':');
  if (parts.length !== 2) return null;

  const user = findRow('Users', 'user_id', parts[0]);
  if (!user || user.is_active !== true && user.is_active !== 'TRUE') return null;

  return user;
}

function requireAuth(params) {
  const user = authenticateUser(params);
  if (!user) {
    throw new Error('UNAUTHORIZED: Please log in.');
  }
  return user;
}

function requireAdmin(params) {
  const user = requireAuth(params);
  if (user.role !== 'admin') {
    throw new Error('FORBIDDEN: Admin access required.');
  }
  return user;
}

function createSessionToken(userId) {
  const tokenHash = Utilities.getUuid().replace(/-/g, '');
  return userId + ':' + tokenHash;
}


// --- DATE HELPERS ---

function now() {
  return new Date().toISOString();
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString();
}

function isExpired(dateStr) {
  if (!dateStr) return true;
  return new Date(dateStr) < new Date();
}

function formatDate(date) {
  if (!date) return '';
  const d = new Date(date);
  return d.toISOString().split('T')[0];
}


// --- ADMIN LOGGING ---

function logAdminAction(adminId, action, targetType, targetId, details) {
  const logId = getNextId('LOG-', 'AdminLogs', 'log_id');
  appendRow_('AdminLogs', [
    logId, adminId, action, targetType, targetId,
    typeof details === 'object' ? JSON.stringify(details) : details,
    now()
  ]);
}


// --- SANITIZATION ---

function sanitize(str) {
  if (!str) return '';
  return String(str).trim();
}

function sanitizeEmail(email) {
  return sanitize(email).toLowerCase();
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}



// =============================================================================
// SECTION 3: AUTHENTICATION — Register, Login, Password
// =============================================================================

function registerUser(params) {
  const email = sanitizeEmail(params.email);
  const password = sanitize(params.password);
  const firstName = sanitize(params.first_name);
  const lastName = sanitize(params.last_name);
  const displayName = sanitize(params.display_name) || firstName;
  const phone = sanitize(params.phone);

  if (!email || !password || !firstName || !lastName) {
    return { success: false, error: 'Missing required fields: email, password, first_name, last_name' };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: 'Invalid email address.' };
  }
  if (password.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const existing = findRow('Users', 'email', email);
  if (existing) {
    return { success: false, error: 'Email already registered. Please log in.' };
  }

  const userId = getNextId('DMAC-', 'Users', 'user_id');
  const hashedPw = hashPassword(password);
  const timestamp = now();

  appendRow_('Users', [
    userId, email, hashedPw, firstName, lastName, displayName,
    phone, '', 'student', 'free', 'active',
    '', '', timestamp, timestamp, 'TRUE', '', ''
  ]);

  const token = createSessionToken(userId);
  sendWelcomeEmail(email, displayName);

  return {
    success: true,
    message: 'Registration successful! Welcome to DMAC Academy, ' + displayName + '!',
    user: {
      user_id: userId,
      email: email,
      display_name: displayName,
      role: 'student',
      tier: 'free',
      tier_status: 'active'
    },
    token: token
  };
}


function loginUser(params) {
  const email = sanitizeEmail(params.email);
  const password = sanitize(params.password);

  if (!email || !password) {
    return { success: false, error: 'Email and password are required.' };
  }

  const user = findRow('Users', 'email', email);
  if (!user) {
    return { success: false, error: 'Invalid email or password.' };
  }

  if (!verifyPassword(password, user.password_hash)) {
    return { success: false, error: 'Invalid email or password.' };
  }

  if (user.is_active !== true && user.is_active !== 'TRUE') {
    return { success: false, error: 'Your account has been deactivated. Contact support.' };
  }

  updateRow('Users', user._rowIndex, 'last_login', now());
  checkAndUpdateTierStatus(user.user_id);

  const updatedUser = findRow('Users', 'user_id', user.user_id);
  const token = createSessionToken(user.user_id);

  return {
    success: true,
    message: 'Welcome back, ' + user.display_name + '!',
    user: {
      user_id: updatedUser.user_id,
      email: updatedUser.email,
      display_name: updatedUser.display_name,
      first_name: updatedUser.first_name,
      last_name: updatedUser.last_name,
      phone: updatedUser.phone,
      profile_photo_url: updatedUser.profile_photo_url,
      role: updatedUser.role,
      tier: updatedUser.tier,
      tier_status: updatedUser.tier_status,
      trial_start: updatedUser.trial_start,
      trial_end: updatedUser.trial_end,
      registered_at: updatedUser.registered_at
    },
    token: token
  };
}


function forgotPassword(params) {
  const email = sanitizeEmail(params.email);
  if (!email) {
    return { success: false, error: 'Email is required.' };
  }

  const user = findRow('Users', 'email', email);
  if (!user) {
    return { success: true, message: 'If that email exists, a reset link has been sent.' };
  }

  const token = generateResetToken();
  const expiry = addDays(new Date(), 0.042); // ~1 hour

  updateMultipleColumns('Users', user._rowIndex, {
    'reset_token': token,
    'reset_token_expiry': expiry
  });

  sendPasswordResetEmail(email, user.display_name, token);

  return {
    success: true,
    message: 'If that email exists, a reset link has been sent.'
  };
}


function resetPassword(params) {
  const token = sanitize(params.reset_token);
  const newPassword = sanitize(params.new_password);

  if (!token || !newPassword) {
    return { success: false, error: 'Reset token and new password are required.' };
  }
  if (newPassword.length < 6) {
    return { success: false, error: 'Password must be at least 6 characters.' };
  }

  const user = findRow('Users', 'reset_token', token);
  if (!user) {
    return { success: false, error: 'Invalid or expired reset token.' };
  }

  if (isExpired(user.reset_token_expiry)) {
    return { success: false, error: 'Reset token has expired. Please request a new one.' };
  }

  updateMultipleColumns('Users', user._rowIndex, {
    'password_hash': hashPassword(newPassword),
    'reset_token': '',
    'reset_token_expiry': ''
  });

  return {
    success: true,
    message: 'Password updated successfully! You can now log in with your new password.'
  };
}


function verifyToken(params) {
  const user = authenticateUser(params);
  if (!user) {
    return { success: false, error: 'Invalid or expired session.' };
  }
  return {
    success: true,
    user: {
      user_id: user.user_id,
      email: user.email,
      display_name: user.display_name,
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
      tier: user.tier,
      tier_status: user.tier_status,
      profile_photo_url: user.profile_photo_url
    }
  };
}


// --- PROFILE ---

function getProfile(params) {
  const user = requireAuth(params);
  return {
    success: true,
    user: {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      display_name: user.display_name,
      phone: user.phone,
      profile_photo_url: user.profile_photo_url,
      role: user.role,
      tier: user.tier,
      tier_status: user.tier_status,
      registered_at: user.registered_at,
      last_login: user.last_login
    }
  };
}

function updateProfile(params) {
  const user = requireAuth(params);

  const updates = {};
  if (params.first_name) updates.first_name = sanitize(params.first_name);
  if (params.last_name) updates.last_name = sanitize(params.last_name);
  if (params.display_name) updates.display_name = sanitize(params.display_name);
  if (params.phone) updates.phone = sanitize(params.phone);

  if (params.new_password) {
    if (!params.current_password || !verifyPassword(params.current_password, user.password_hash)) {
      return { success: false, error: 'Current password is incorrect.' };
    }
    if (params.new_password.length < 6) {
      return { success: false, error: 'New password must be at least 6 characters.' };
    }
    updates.password_hash = hashPassword(params.new_password);
  }

  if (Object.keys(updates).length === 0) {
    return { success: false, error: 'No fields to update.' };
  }

  updateMultipleColumns('Users', user._rowIndex, updates);

  return { success: true, message: 'Profile updated successfully!' };
}

function uploadPhoto(params) {
  const user = requireAuth(params);
  const photoUrl = sanitize(params.photo_url);

  if (!photoUrl) {
    return { success: false, error: 'photo_url is required.' };
  }

  updateRow('Users', user._rowIndex, 'profile_photo_url', photoUrl);

  return { success: true, message: 'Profile photo updated!', photo_url: photoUrl };
}


// --- TIER STATUS CHECK ---

function checkAndUpdateTierStatus(userId) {
  const user = findRow('Users', 'user_id', userId);
  if (!user || user.tier === 'free') return;

  if (user.tier_status === 'trial' && user.trial_end && isExpired(user.trial_end)) {
    updateMultipleColumns('Users', user._rowIndex, {
      'tier': 'free',
      'tier_status': 'active'
    });
    return;
  }

  const subs = findRows('Subscriptions', 'user_id', userId);
  const activeSub = subs.find(s => s.status === 'active' && !isExpired(s.end_date));

  if (!activeSub && user.tier_status === 'active' && user.tier !== 'free') {
    updateMultipleColumns('Users', user._rowIndex, {
      'tier': 'free',
      'tier_status': 'expired'
    });
  }
}



// =============================================================================
// SECTION 4: SUBSCRIPTIONS — Tier management, upgrades, renewals
// =============================================================================

const PRICING = {
  pro:    { intro: 199, renewal: 249 },
  master: { intro: 399, renewal: 499 }
};

function getSubscription(params) {
  const user = requireAuth(params);

  const subs = findRows('Subscriptions', 'user_id', user.user_id);
  const activeSub = subs.find(s => s.status === 'active' && !isExpired(s.end_date));

  return {
    success: true,
    current_tier: user.tier,
    tier_status: user.tier_status,
    active_subscription: activeSub ? {
      sub_id: activeSub.sub_id,
      tier: activeSub.tier,
      type: activeSub.type,
      amount: activeSub.amount,
      start_date: activeSub.start_date,
      end_date: activeSub.end_date,
      is_intro: activeSub.is_intro
    } : null,
    history: subs.map(s => ({
      sub_id: s.sub_id,
      tier: s.tier,
      type: s.type,
      amount: s.amount,
      start_date: s.start_date,
      end_date: s.end_date,
      status: s.status
    }))
  };
}


function createSubscription(params) {
  const user = requireAuth(params);
  const tier = sanitize(params.tier);
  const paymentId = sanitize(params.payment_id);

  if (!tier || !['pro', 'master'].includes(tier)) {
    return { success: false, error: 'Invalid tier. Choose "pro" or "master".' };
  }

  if (paymentId) {
    const payment = findRow('Payments', 'payment_id', paymentId);
    if (!payment || payment.status !== 'paid') {
      return { success: false, error: 'Payment must be verified before activating subscription.' };
    }
  }

  const existingSubs = findRows('Subscriptions', 'user_id', user.user_id);
  const hadThisTier = existingSubs.some(s => s.tier === tier);
  const isUpgrade = user.tier !== 'free' && user.tier !== tier;

  let subType = 'new';
  let isIntro = true;

  if (hadThisTier) {
    subType = 'renewal';
    isIntro = false;
  } else if (isUpgrade) {
    subType = 'upgrade';
    isIntro = !existingSubs.some(s => s.tier === tier);
  }

  const price = isIntro ? PRICING[tier].intro : PRICING[tier].renewal;
  const subId = getNextId('SUB-', 'Subscriptions', 'sub_id');
  const startDate = now();
  const endDate = addDays(new Date(), 30);

  existingSubs.forEach(s => {
    if (s.status === 'active') {
      updateRow('Subscriptions', s._rowIndex, 'status', 'expired');
    }
  });

  appendRow_('Subscriptions', [
    subId, user.user_id, tier, subType, price, paymentId || '',
    startDate, endDate, isIntro ? 'TRUE' : 'FALSE', 'active', startDate
  ]);

  updateMultipleColumns('Users', user._rowIndex, {
    'tier': tier,
    'tier_status': 'active'
  });

  sendSubscriptionEmail(user.email, user.display_name, tier, subType, price);

  return {
    success: true,
    message: 'Successfully subscribed to ' + tier.toUpperCase() + ' tier!',
    subscription: {
      sub_id: subId,
      tier: tier,
      type: subType,
      amount: price,
      start_date: startDate,
      end_date: endDate,
      is_intro: isIntro
    }
  };
}


function cancelSubscription(params) {
  const user = requireAuth(params);

  const subs = findRows('Subscriptions', 'user_id', user.user_id);
  const activeSub = subs.find(s => s.status === 'active');

  if (!activeSub) {
    return { success: false, error: 'No active subscription to cancel.' };
  }

  updateRow('Subscriptions', activeSub._rowIndex, 'status', 'cancelled');
  updateMultipleColumns('Users', user._rowIndex, {
    'tier': 'free',
    'tier_status': 'active'
  });

  return {
    success: true,
    message: 'Subscription cancelled. You\'ve been moved to the Free tier.'
  };
}


function checkExpiry(params) {
  const allSubs = getAllRows('Subscriptions');
  let expiredCount = 0;

  allSubs.forEach(sub => {
    if (sub.status === 'active' && isExpired(sub.end_date)) {
      const subRow = findRow('Subscriptions', 'sub_id', sub.sub_id);
      if (subRow) {
        updateRow('Subscriptions', subRow._rowIndex, 'status', 'expired');

        const otherActive = findRows('Subscriptions', 'user_id', sub.user_id)
          .some(s => s.status === 'active' && s.sub_id !== sub.sub_id && !isExpired(s.end_date));

        if (!otherActive) {
          const user = findRow('Users', 'user_id', sub.user_id);
          if (user) {
            updateMultipleColumns('Users', user._rowIndex, {
              'tier': 'free',
              'tier_status': 'expired'
            });
            sendExpiryEmail(user.email, user.display_name, sub.tier);
          }
        }
        expiredCount++;
      }
    }
  });

  return {
    success: true,
    message: 'Checked all subscriptions. ' + expiredCount + ' expired.',
    expired_count: expiredCount
  };
}


function startFreeTrial(params) {
  const user = requireAuth(params);

  if (user.tier !== 'free') {
    return { success: false, error: 'Free trial is only for Free tier users.' };
  }

  if (user.trial_start) {
    return { success: false, error: 'You have already used your free trial.' };
  }

  const trialStart = now();
  const trialEnd = addDays(new Date(), 3);

  updateMultipleColumns('Users', user._rowIndex, {
    'tier': 'pro',
    'tier_status': 'trial',
    'trial_start': trialStart,
    'trial_end': trialEnd
  });

  return {
    success: true,
    message: 'Pro trial activated! You have 3 days to explore Pro content.',
    trial_end: trialEnd
  };
}



// =============================================================================
// SECTION 5: PAYMENTS — PayMongo (GCash, Maya, Bank Transfer)
// =============================================================================

const PAYMONGO_SECRET_KEY = 'sk_test_XXXXXXXXXXXXXXXX'; // <-- REPLACE WITH REAL KEY
const PAYMONGO_PUBLIC_KEY = 'pk_test_XXXXXXXXXXXXXXXX'; // <-- REPLACE WITH REAL KEY
const PAYMONGO_API = 'https://api.paymongo.com/v1';

function createPayment(params) {
  const user = requireAuth(params);
  const type = sanitize(params.type);
  const amount = Number(params.amount);
  const method = sanitize(params.method);
  const description = sanitize(params.description) || 'DMAC Academy Payment';

  if (!type || !amount || !method) {
    return { success: false, error: 'Missing required fields: type, amount, method' };
  }

  if (!['gcash', 'maya', 'bank_transfer'].includes(method)) {
    return { success: false, error: 'Invalid payment method. Choose: gcash, maya, or bank_transfer' };
  }

  const paymongoResult = createPayMongoCheckout(amount, method, description, user);

  if (!paymongoResult.success) {
    return paymongoResult;
  }

  const paymentId = getNextId('PAY-', 'Payments', 'payment_id');

  appendRow_('Payments', [
    paymentId, user.user_id, type, amount, method,
    paymongoResult.reference || '', paymongoResult.checkout_url || '',
    'pending', '', now(), ''
  ]);

  return {
    success: true,
    payment_id: paymentId,
    checkout_url: paymongoResult.checkout_url,
    message: 'Payment created! Complete the payment using the checkout link.'
  };
}


function createPayMongoCheckout(amount, method, description, user) {
  try {
    const amountInCentavos = Math.round(amount * 100);

    const paymentMethodMap = {
      'gcash': 'gcash',
      'maya': 'paymaya',
      'bank_transfer': 'dob'
    };

    const payload = {
      data: {
        attributes: {
          send_email_receipt: true,
          show_description: true,
          show_line_items: true,
          description: description,
          line_items: [{
            currency: 'PHP',
            amount: amountInCentavos,
            name: description,
            quantity: 1
          }],
          payment_method_types: [paymentMethodMap[method]],
          success_url: 'https://dmacacademy.github.io/payment-success',
          cancel_url: 'https://dmacacademy.github.io/payment-cancel',
          metadata: {
            user_id: user.user_id,
            email: user.email
          }
        }
      }
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + Utilities.base64Encode(PAYMONGO_SECRET_KEY + ':')
      },
      payload: JSON.stringify(payload),
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(PAYMONGO_API + '/checkout_sessions', options);
    const result = JSON.parse(response.getContentText());

    if (result.data) {
      return {
        success: true,
        reference: result.data.id,
        checkout_url: result.data.attributes.checkout_url
      };
    } else {
      return {
        success: false,
        error: 'PayMongo error: ' + JSON.stringify(result.errors || result)
      };
    }

  } catch (err) {
    return {
      success: true,
      reference: 'MANUAL-' + Date.now(),
      checkout_url: '',
      note: 'PayMongo not configured. Manual verification required.'
    };
  }
}


function verifyPayment(params) {
  const user = requireAuth(params);
  const paymentId = sanitize(params.payment_id);

  if (!paymentId) {
    return { success: false, error: 'payment_id is required.' };
  }

  const payment = findRow('Payments', 'payment_id', paymentId);
  if (!payment) {
    return { success: false, error: 'Payment not found.' };
  }

  if (payment.paymongo_ref && !payment.paymongo_ref.startsWith('MANUAL')) {
    const status = checkPayMongoStatus(payment.paymongo_ref);
    if (status.paid) {
      updateMultipleColumns('Payments', payment._rowIndex, {
        'status': 'paid',
        'paid_at': now()
      });
      return { success: true, status: 'paid', message: 'Payment verified!' };
    }
  }

  return {
    success: true,
    status: payment.status,
    message: 'Current payment status: ' + payment.status
  };
}


function checkPayMongoStatus(checkoutId) {
  try {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Utilities.base64Encode(PAYMONGO_SECRET_KEY + ':')
      },
      muteHttpExceptions: true
    };

    const response = UrlFetchApp.fetch(PAYMONGO_API + '/checkout_sessions/' + checkoutId, options);
    const result = JSON.parse(response.getContentText());

    if (result.data && result.data.attributes) {
      const status = result.data.attributes.payment_intent?.attributes?.status;
      return { paid: status === 'succeeded' };
    }
    return { paid: false };
  } catch (err) {
    return { paid: false };
  }
}


function paymentWebhook(params) {
  const eventType = params.data?.attributes?.type || '';
  const resource = params.data?.attributes?.data || {};

  if (eventType === 'checkout_session.payment.paid') {
    const checkoutId = resource.id;
    const metadata = resource.attributes?.metadata || {};

    const payment = findRow('Payments', 'paymongo_ref', checkoutId);
    if (payment && payment.status !== 'paid') {
      updateMultipleColumns('Payments', payment._rowIndex, {
        'status': 'paid',
        'paid_at': now()
      });

      if (payment.type === 'subscription') {
        const user = findRow('Users', 'user_id', payment.user_id);
        if (user) {
          let tier = 'pro';
          if (payment.amount >= 399) tier = 'master';

          createSubscription({
            token: createSessionToken(payment.user_id),
            tier: tier,
            payment_id: payment.payment_id
          });
        }
      }

      const user = findRow('Users', 'user_id', payment.user_id);
      if (user) {
        sendPaymentConfirmationEmail(user.email, user.display_name, payment.amount, payment.method);
      }
    }
  }

  return { success: true, received: true };
}


function getPaymentHistory(params) {
  const user = requireAuth(params);
  const payments = findRows('Payments', 'user_id', user.user_id);

  return {
    success: true,
    payments: payments.map(p => ({
      payment_id: p.payment_id,
      type: p.type,
      amount: p.amount,
      method: p.method,
      status: p.status,
      paid_at: p.paid_at,
      created_at: p.created_at
    })).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  };
}


function adminVerifyPayment(params) {
  const admin = requireAdmin(params);
  const paymentId = sanitize(params.payment_id);
  const action = sanitize(params.verify_action);

  if (!paymentId || !action) {
    return { success: false, error: 'payment_id and verify_action (approve/reject) required.' };
  }

  const payment = findRow('Payments', 'payment_id', paymentId);
  if (!payment) {
    return { success: false, error: 'Payment not found.' };
  }

  if (action === 'approve') {
    updateMultipleColumns('Payments', payment._rowIndex, {
      'status': 'paid',
      'paid_at': now(),
      'notes': 'Manually verified by ' + admin.display_name
    });

    if (payment.type === 'subscription') {
      let tier = 'pro';
      if (payment.amount >= 399) tier = 'master';

      createSubscription({
        token: createSessionToken(payment.user_id),
        tier: tier,
        payment_id: payment.payment_id
      });
    }

    logAdminAction(admin.user_id, 'verify_payment', 'payment', paymentId, { action: 'approved' });

    return { success: true, message: 'Payment approved and subscription activated!' };

  } else if (action === 'reject') {
    updateMultipleColumns('Payments', payment._rowIndex, {
      'status': 'failed',
      'notes': 'Rejected by ' + admin.display_name + ': ' + (params.reason || '')
    });

    logAdminAction(admin.user_id, 'reject_payment', 'payment', paymentId, { reason: params.reason || '' });

    return { success: true, message: 'Payment rejected.' };
  }

  return { success: false, error: 'verify_action must be "approve" or "reject".' };
}



// =============================================================================
// SECTION 6: COURSES — Modules, Lessons, Quizzes
// =============================================================================

function getModules(params) {
  const user = requireAuth(params);
  const allModules = getAllRows('Modules');

  const tierOrder = { 'free': 0, 'pro': 1, 'master': 2 };
  const userTierLevel = tierOrder[user.tier] || 0;

  const modules = allModules
    .filter(m => m.is_published === true || m.is_published === 'TRUE')
    .sort((a, b) => Number(a.order_index) - Number(b.order_index))
    .map(m => {
      const moduleTierLevel = tierOrder[m.tier_required] || 0;
      const isAccessible = moduleTierLevel <= userTierLevel;

      const progress = findRows('UserProgress', 'user_id', user.user_id)
        .filter(p => p.module_id === m.module_id);

      const lessonsCompleted = progress.filter(p => p.type === 'lesson_complete').length;
      const quizPassed = progress.some(p => p.type === 'module_complete' || (p.type === 'quiz_attempt' && (p.quiz_passed === true || p.quiz_passed === 'TRUE')));

      return {
        module_id: m.module_id,
        title: m.title,
        description: m.description,
        tier_required: m.tier_required,
        order_index: Number(m.order_index),
        total_lessons: Number(m.total_lessons),
        passing_score: Number(m.passing_score),
        is_accessible: isAccessible,
        is_locked: !isAccessible,
        lessons_completed: lessonsCompleted,
        quiz_passed: quizPassed,
        progress_percent: m.total_lessons > 0 ? Math.round((lessonsCompleted / Number(m.total_lessons)) * 100) : 0
      };
    });

  return { success: true, modules: modules };
}


function getModule(params) {
  const user = requireAuth(params);
  const moduleId = sanitize(params.module_id);

  if (!moduleId) return { success: false, error: 'module_id is required.' };

  const mod = findRow('Modules', 'module_id', moduleId);
  if (!mod) return { success: false, error: 'Module not found.' };

  const tierOrder = { 'free': 0, 'pro': 1, 'master': 2 };
  if ((tierOrder[mod.tier_required] || 0) > (tierOrder[user.tier] || 0)) {
    return { success: false, error: 'Upgrade to ' + mod.tier_required.toUpperCase() + ' to access this module.' };
  }

  const prevOrder = Number(mod.order_index) - 1;
  if (prevOrder > 0) {
    const allModules = getAllRows('Modules');
    const prevModule = allModules.find(m => Number(m.order_index) === prevOrder);
    if (prevModule) {
      const prevComplete = findRows('UserProgress', 'user_id', user.user_id)
        .some(p => p.module_id === prevModule.module_id && p.type === 'module_complete');
      if (!prevComplete) {
        return {
          success: false,
          error: 'Complete "' + prevModule.title + '" first to unlock this module.',
          locked_by: prevModule.module_id
        };
      }
    }
  }

  const lessons = findRows('Lessons', 'module_id', moduleId)
    .filter(l => l.is_published === true || l.is_published === 'TRUE')
    .sort((a, b) => Number(a.order_index) - Number(b.order_index));

  return {
    success: true,
    module: {
      module_id: mod.module_id,
      title: mod.title,
      description: mod.description,
      tier_required: mod.tier_required,
      total_lessons: Number(mod.total_lessons),
      passing_score: Number(mod.passing_score)
    },
    lessons: lessons.map(l => ({
      lesson_id: l.lesson_id,
      title: l.title,
      order_index: Number(l.order_index),
      duration_mins: Number(l.duration_mins),
      has_video: !!l.video_url,
      has_audio: !!l.audio_url,
      has_read: !!(l.read_content || l.read_url)
    }))
  };
}


function getLessons(params) {
  const user = requireAuth(params);
  const moduleId = sanitize(params.module_id);

  if (!moduleId) return { success: false, error: 'module_id is required.' };

  const lessons = findRows('Lessons', 'module_id', moduleId)
    .filter(l => l.is_published === true || l.is_published === 'TRUE')
    .sort((a, b) => Number(a.order_index) - Number(b.order_index));

  const progress = findRows('UserProgress', 'user_id', user.user_id)
    .filter(p => p.module_id === moduleId && p.type === 'lesson_complete');

  return {
    success: true,
    lessons: lessons.map(l => ({
      lesson_id: l.lesson_id,
      title: l.title,
      order_index: Number(l.order_index),
      duration_mins: Number(l.duration_mins),
      has_video: !!l.video_url,
      has_audio: !!l.audio_url,
      has_read: !!(l.read_content || l.read_url),
      is_completed: progress.some(p => p.lesson_id === l.lesson_id)
    }))
  };
}


function getLesson(params) {
  const user = requireAuth(params);
  const lessonId = sanitize(params.lesson_id);
  const mode = sanitize(params.mode) || 'read_video';

  if (!lessonId) return { success: false, error: 'lesson_id is required.' };

  const lesson = findRow('Lessons', 'lesson_id', lessonId);
  if (!lesson) return { success: false, error: 'Lesson not found.' };

  const mod = findRow('Modules', 'module_id', lesson.module_id);
  if (mod) {
    const tierOrder = { 'free': 0, 'pro': 1, 'master': 2 };
    if ((tierOrder[mod.tier_required] || 0) > (tierOrder[user.tier] || 0)) {
      return { success: false, error: 'Upgrade to access this lesson.' };
    }
  }

  const response = {
    lesson_id: lesson.lesson_id,
    module_id: lesson.module_id,
    title: lesson.title,
    duration_mins: Number(lesson.duration_mins),
    mode: mode
  };

  switch (mode) {
    case 'read_video':
      response.video_url = lesson.video_url || '';
      response.read_content = lesson.read_content || '';
      response.read_url = lesson.read_url || '';
      break;
    case 'audio_video':
      response.video_url = lesson.video_url || '';
      response.audio_url = lesson.audio_url || '';
      break;
    case 'audio_read':
      response.audio_url = lesson.audio_url || '';
      response.read_content = lesson.read_content || '';
      response.read_url = lesson.read_url || '';
      break;
  }

  return { success: true, lesson: response };
}


// --- QUIZZES ---

function getQuiz(params) {
  const user = requireAuth(params);
  const moduleId = sanitize(params.module_id);

  if (!moduleId) return { success: false, error: 'module_id is required.' };

  const quiz = findRow('Quizzes', 'module_id', moduleId);
  if (!quiz) return { success: false, error: 'No quiz found for this module.' };

  const mod = findRow('Modules', 'module_id', moduleId);
  const lessons = findRows('Lessons', 'module_id', moduleId)
    .filter(l => l.is_published === true || l.is_published === 'TRUE');
  const completedLessons = findRows('UserProgress', 'user_id', user.user_id)
    .filter(p => p.module_id === moduleId && p.type === 'lesson_complete');

  if (completedLessons.length < lessons.length) {
    return {
      success: false,
      error: 'Complete all lessons first before taking the quiz.',
      lessons_completed: completedLessons.length,
      total_lessons: lessons.length
    };
  }

  const attempts = findRows('UserProgress', 'user_id', user.user_id)
    .filter(p => p.module_id === moduleId && p.type === 'quiz_attempt');

  if (quiz.max_attempts > 0 && attempts.length >= Number(quiz.max_attempts)) {
    const passed = attempts.some(a => a.quiz_passed === true || a.quiz_passed === 'TRUE');
    if (!passed) {
      return { success: false, error: 'Maximum quiz attempts reached. Contact Coach DJ for assistance.' };
    }
  }

  return {
    success: true,
    quiz: {
      quiz_id: quiz.quiz_id,
      module_id: quiz.module_id,
      title: quiz.title,
      description: quiz.description,
      total_questions: Number(quiz.total_questions),
      time_limit_mins: Number(quiz.time_limit_mins),
      max_attempts: Number(quiz.max_attempts),
      attempts_used: attempts.length,
      already_passed: attempts.some(a => a.quiz_passed === true || a.quiz_passed === 'TRUE')
    }
  };
}


function getQuizQuestions(params) {
  const user = requireAuth(params);
  const quizId = sanitize(params.quiz_id);

  if (!quizId) return { success: false, error: 'quiz_id is required.' };

  const questions = findRows('QuizQuestions', 'quiz_id', quizId)
    .sort((a, b) => Number(a.order_index) - Number(b.order_index));

  return {
    success: true,
    questions: questions.map(q => ({
      question_id: q.question_id,
      question_text: q.question_text,
      options: [
        { key: 'a', text: q.option_a },
        { key: 'b', text: q.option_b },
        { key: 'c', text: q.option_c },
        { key: 'd', text: q.option_d },
      ]
    }))
  };
}


function submitQuiz(params) {
  const user = requireAuth(params);
  const quizId = sanitize(params.quiz_id);
  const answers = params.answers || {};

  if (!quizId) return { success: false, error: 'quiz_id is required.' };

  const quiz = findRow('Quizzes', 'quiz_id', quizId);
  if (!quiz) return { success: false, error: 'Quiz not found.' };

  const questions = findRows('QuizQuestions', 'quiz_id', quizId);
  let correct = 0;
  const results = [];

  questions.forEach(q => {
    const userAnswer = answers[q.question_id] || '';
    const isCorrect = userAnswer.toLowerCase() === q.correct_answer.toLowerCase();
    if (isCorrect) correct++;
    results.push({
      question_id: q.question_id,
      your_answer: userAnswer,
      correct_answer: q.correct_answer,
      is_correct: isCorrect,
      explanation: q.explanation
    });
  });

  const score = questions.length > 0 ? Math.round((correct / questions.length) * 100) : 0;
  const mod = findRow('Modules', 'module_id', quiz.module_id);
  const passingScore = mod ? Number(mod.passing_score) : 70;
  const passed = score >= passingScore;

  const progressId = getNextId('PRG-', 'UserProgress', 'progress_id');
  appendRow_('UserProgress', [
    progressId, user.user_id, quiz.module_id, '', 'quiz_attempt',
    score, passed ? 'TRUE' : 'FALSE', '', now()
  ]);

  if (passed) {
    const completionId = getNextId('PRG-', 'UserProgress', 'progress_id');
    appendRow_('UserProgress', [
      completionId, user.user_id, quiz.module_id, '', 'module_complete',
      score, 'TRUE', '', now()
    ]);

    checkTierCompletion(user, quiz.module_id);
  }

  return {
    success: true,
    score: score,
    correct: correct,
    total: questions.length,
    passing_score: passingScore,
    passed: passed,
    message: passed
      ? 'Congratulations! You passed with ' + score + '%!'
      : 'You scored ' + score + '%. You need ' + passingScore + '% to pass. Try again!',
    results: results
  };
}


function checkTierCompletion(user, justCompletedModuleId) {
  const mod = findRow('Modules', 'module_id', justCompletedModuleId);
  if (!mod) return;

  const tier = mod.tier_required;
  const tierModules = getAllRows('Modules')
    .filter(m => m.tier_required === tier && (m.is_published === true || m.is_published === 'TRUE'));

  const completedModules = findRows('UserProgress', 'user_id', user.user_id)
    .filter(p => p.type === 'module_complete');

  const allTierComplete = tierModules.every(m =>
    completedModules.some(c => c.module_id === m.module_id)
  );

  if (allTierComplete) {
    generateCertificate({
      token: createSessionToken(user.user_id),
      tier: tier
    });
  }
}



// =============================================================================
// SECTION 7: PROGRESS TRACKING — Dashboard, lesson completion
// =============================================================================

function markLessonComplete(params) {
  const user = requireAuth(params);
  const lessonId = sanitize(params.lesson_id);
  const mode = sanitize(params.mode) || 'read_video';

  if (!lessonId) return { success: false, error: 'lesson_id is required.' };

  const lesson = findRow('Lessons', 'lesson_id', lessonId);
  if (!lesson) return { success: false, error: 'Lesson not found.' };

  const existing = findRows('UserProgress', 'user_id', user.user_id)
    .find(p => p.lesson_id === lessonId && p.type === 'lesson_complete');

  if (existing) {
    return { success: true, message: 'Lesson already completed!', already_completed: true };
  }

  const progressId = getNextId('PRG-', 'UserProgress', 'progress_id');
  appendRow_('UserProgress', [
    progressId, user.user_id, lesson.module_id, lessonId, 'lesson_complete',
    '', '', mode, now()
  ]);

  const moduleLessons = findRows('Lessons', 'module_id', lesson.module_id)
    .filter(l => l.is_published === true || l.is_published === 'TRUE');
  const completedLessons = findRows('UserProgress', 'user_id', user.user_id)
    .filter(p => p.module_id === lesson.module_id && p.type === 'lesson_complete');

  const allLessonsDone = completedLessons.length >= moduleLessons.length;

  return {
    success: true,
    message: 'Lesson completed!',
    lessons_completed: completedLessons.length,
    total_lessons: moduleLessons.length,
    quiz_unlocked: allLessonsDone
  };
}


function getProgress(params) {
  const user = requireAuth(params);

  const allProgress = findRows('UserProgress', 'user_id', user.user_id);
  const allModules = getAllRows('Modules')
    .filter(m => m.is_published === true || m.is_published === 'TRUE')
    .sort((a, b) => Number(a.order_index) - Number(b.order_index));

  const moduleProgress = allModules.map(mod => {
    const moduleLessons = findRows('Lessons', 'module_id', mod.module_id)
      .filter(l => l.is_published === true || l.is_published === 'TRUE');
    const completedLessons = allProgress
      .filter(p => p.module_id === mod.module_id && p.type === 'lesson_complete');
    const quizAttempts = allProgress
      .filter(p => p.module_id === mod.module_id && p.type === 'quiz_attempt');
    const isComplete = allProgress
      .some(p => p.module_id === mod.module_id && p.type === 'module_complete');

    const bestScore = quizAttempts.length > 0
      ? Math.max(...quizAttempts.map(a => Number(a.quiz_score) || 0))
      : null;

    return {
      module_id: mod.module_id,
      title: mod.title,
      tier_required: mod.tier_required,
      total_lessons: moduleLessons.length,
      lessons_completed: completedLessons.length,
      progress_percent: moduleLessons.length > 0
        ? Math.round((completedLessons.length / moduleLessons.length) * 100) : 0,
      quiz_attempts: quizAttempts.length,
      best_score: bestScore,
      is_complete: isComplete
    };
  });

  const totalModules = moduleProgress.length;
  const completedModules = moduleProgress.filter(m => m.is_complete).length;

  return {
    success: true,
    overall: {
      total_modules: totalModules,
      completed_modules: completedModules,
      overall_progress: totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0
    },
    modules: moduleProgress
  };
}


function getDashboardData(params) {
  const user = requireAuth(params);

  const allProgress = findRows('UserProgress', 'user_id', user.user_id);
  const allModules = getAllRows('Modules')
    .filter(m => m.is_published === true || m.is_published === 'TRUE');

  const completedModules = new Set(
    allProgress
      .filter(p => p.type === 'module_complete')
      .map(p => p.module_id)
  );
  const completedLessons = allProgress.filter(p => p.type === 'lesson_complete');

  const recentActivity = allProgress
    .sort((a, b) => new Date(b.completed_at) - new Date(a.completed_at))
    .slice(0, 5)
    .map(p => {
      const mod = allModules.find(m => m.module_id === p.module_id);
      return {
        type: p.type,
        module: mod ? mod.title : p.module_id,
        score: p.quiz_score || null,
        date: p.completed_at
      };
    });

  const tierOrder = { 'free': 0, 'pro': 1, 'master': 2 };
  const userTierLevel = tierOrder[user.tier] || 0;
  const currentModule = allModules
    .sort((a, b) => Number(a.order_index) - Number(b.order_index))
    .find(m =>
      (tierOrder[m.tier_required] || 0) <= userTierLevel &&
      !completedModules.has(m.module_id)
    );

  const subs = findRows('Subscriptions', 'user_id', user.user_id);
  const activeSub = subs.find(s => s.status === 'active' && !isExpired(s.end_date));

  const certs = findRows('Certificates', 'user_id', user.user_id);

  const bookings = findRows('Bookings', 'user_id', user.user_id)
    .filter(b => b.status === 'confirmed' && !isExpired(b.date))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);

  return {
    success: true,
    dashboard: {
      user: {
        display_name: user.display_name,
        tier: user.tier,
        tier_status: user.tier_status,
        profile_photo_url: user.profile_photo_url
      },
      stats: {
        modules_completed: completedModules.size,
        total_modules: allModules.length,
        lessons_completed: completedLessons.length,
        certificates_earned: certs.length,
        overall_progress: allModules.length > 0
          ? Math.round((completedModules.size / allModules.length) * 100) : 0
      },
      current_module: currentModule ? {
        module_id: currentModule.module_id,
        title: currentModule.title,
        description: currentModule.description
      } : null,
      subscription: activeSub ? {
        tier: activeSub.tier,
        end_date: activeSub.end_date,
        days_remaining: Math.max(0, Math.ceil((new Date(activeSub.end_date) - new Date()) / (1000 * 60 * 60 * 24)))
      } : null,
      upcoming_sessions: bookings.map(b => ({
        booking_id: b.booking_id,
        date: b.date,
        start_time: b.start_time,
        platform: b.platform,
        meet_link: b.meet_link
      })),
      recent_activity: recentActivity
    }
  };
}


function getProgressBoard(params) {
  const allProgress = getAllRows('UserProgress');
  const allUsers = getAllRows('Users').filter(u => u.role === 'student' && (u.is_active === true || u.is_active === 'TRUE'));

  const board = allUsers.map(u => {
    const userProgress = allProgress.filter(p => p.user_id === u.user_id);
    const modulesCompleted = new Set(
      userProgress.filter(p => p.type === 'module_complete').map(p => p.module_id)
    ).size;
    const lessonsCompleted = userProgress.filter(p => p.type === 'lesson_complete').length;
    const certs = findRows('Certificates', 'user_id', u.user_id);

    return {
      display_name: u.display_name,
      profile_photo_url: u.profile_photo_url,
      tier: u.tier,
      modules_completed: modulesCompleted,
      lessons_completed: lessonsCompleted,
      certificates: certs.length,
      member_since: u.registered_at
    };
  })
  .filter(u => u.modules_completed > 0 || u.lessons_completed > 0)
  .sort((a, b) => b.modules_completed - a.modules_completed || b.lessons_completed - a.lessons_completed);

  return {
    success: true,
    board: board,
    total_students: allUsers.length,
    total_active: board.length
  };
}



// =============================================================================
// SECTION 8: BOOKINGS — Live session scheduling
// =============================================================================

function getAvailableSlots(params) {
  const user = requireAuth(params);
  const dateFilter = sanitize(params.date);

  const allSlots = getAllRows('CoachAvailability');

  let slots = allSlots.filter(s => {
    if (s.status !== 'open') return false;
    const slotDate = new Date(s.date);
    if (slotDate < new Date(new Date().toDateString())) return false;
    if (dateFilter && formatDate(s.date) !== dateFilter) return false;
    return true;
  });

  const grouped = {};
  slots.forEach(s => {
    const date = formatDate(s.date);
    if (!grouped[date]) grouped[date] = [];
    grouped[date].push({
      slot_id: s.slot_id,
      date: date,
      start_time: s.start_time,
      end_time: s.end_time,
      hourly_rate: Number(s.hourly_rate),
      status: s.status
    });
  });

  return {
    success: true,
    slots: grouped,
    total_available: slots.length
  };
}


function createBooking(params) {
  const user = requireAuth(params);
  const slotId = sanitize(params.slot_id);
  const platform = sanitize(params.platform) || 'zoom';
  const notes = sanitize(params.notes);
  const paymentId = sanitize(params.payment_id);

  if (!slotId) return { success: false, error: 'slot_id is required.' };
  if (!['zoom', 'gmeet'].includes(platform)) {
    return { success: false, error: 'Platform must be "zoom" or "gmeet".' };
  }

  const slot = findRow('CoachAvailability', 'slot_id', slotId);
  if (!slot) return { success: false, error: 'Slot not found.' };
  if (slot.status !== 'open') return { success: false, error: 'This slot is no longer available.' };

  if (paymentId) {
    const payment = findRow('Payments', 'payment_id', paymentId);
    if (!payment || payment.status !== 'paid') {
      return { success: false, error: 'Payment must be verified before booking.' };
    }
  }

  const bookingId = getNextId('BK-', 'Bookings', 'booking_id');

  appendRow_('Bookings', [
    bookingId, user.user_id, slotId, paymentId || '',
    formatDate(slot.date), slot.start_time, slot.end_time,
    platform, '',
    paymentId ? 'confirmed' : 'pending',
    notes, now()
  ]);

  updateMultipleColumns('CoachAvailability', slot._rowIndex, {
    'status': 'booked',
    'booked_by': user.user_id
  });

  sendBookingConfirmationEmail(user.email, user.display_name, formatDate(slot.date), slot.start_time, slot.end_time, platform);
  sendBookingNotificationToAdmin(user.display_name, formatDate(slot.date), slot.start_time, platform);

  return {
    success: true,
    message: 'Booking confirmed! Check your email for details.',
    booking: {
      booking_id: bookingId,
      date: formatDate(slot.date),
      start_time: slot.start_time,
      end_time: slot.end_time,
      platform: platform,
      status: paymentId ? 'confirmed' : 'pending'
    }
  };
}


function cancelBooking(params) {
  const user = requireAuth(params);
  const bookingId = sanitize(params.booking_id);

  if (!bookingId) return { success: false, error: 'booking_id is required.' };

  const booking = findRow('Bookings', 'booking_id', bookingId);
  if (!booking) return { success: false, error: 'Booking not found.' };
  if (booking.user_id !== user.user_id && user.role !== 'admin') {
    return { success: false, error: 'You can only cancel your own bookings.' };
  }
  if (booking.status === 'cancelled') {
    return { success: false, error: 'Booking is already cancelled.' };
  }
  if (booking.status === 'completed') {
    return { success: false, error: 'Completed bookings cannot be cancelled.' };
  }

  updateRow('Bookings', booking._rowIndex, 'status', 'cancelled');

  const slot = findRow('CoachAvailability', 'slot_id', booking.slot_id);
  if (slot) {
    updateMultipleColumns('CoachAvailability', slot._rowIndex, {
      'status': 'open',
      'booked_by': ''
    });
  }

  return { success: true, message: 'Booking cancelled. The slot is now available again.' };
}


function getMyBookings(params) {
  const user = requireAuth(params);

  const bookings = findRows('Bookings', 'user_id', user.user_id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return {
    success: true,
    bookings: bookings.map(b => ({
      booking_id: b.booking_id,
      date: b.date,
      start_time: b.start_time,
      end_time: b.end_time,
      platform: b.platform,
      meet_link: b.meet_link,
      status: b.status,
      notes: b.notes,
      created_at: b.created_at
    }))
  };
}


// --- ADMIN BOOKING MANAGEMENT ---

function adminManageSlots(params) {
  const admin = requireAdmin(params);
  const action = sanitize(params.slot_action);

  if (action === 'add') {
    const date = sanitize(params.date);
    const startTime = sanitize(params.start_time);
    const endTime = sanitize(params.end_time);
    const rate = Number(params.hourly_rate) || 500;

    if (!date || !startTime || !endTime) {
      return { success: false, error: 'date, start_time, and end_time are required.' };
    }

    const daySlots = getAllRows('CoachAvailability')
      .filter(s => formatDate(s.date) === date && s.status !== 'blocked');

    if (daySlots.length >= 3) {
      return { success: false, error: 'Maximum 3 slots per day reached.' };
    }

    const slotId = getNextId('SLOT-', 'CoachAvailability', 'slot_id');
    appendRow_('CoachAvailability', [
      slotId, date, startTime, endTime, rate, 'open', '', now()
    ]);

    logAdminAction(admin.user_id, 'add_slot', 'slot', slotId, { date, startTime, endTime, rate });

    return { success: true, message: 'Slot added!', slot_id: slotId };

  } else if (action === 'block') {
    const slotId = sanitize(params.slot_id);
    const slot = findRow('CoachAvailability', 'slot_id', slotId);
    if (!slot) return { success: false, error: 'Slot not found.' };

    updateRow('CoachAvailability', slot._rowIndex, 'status', 'blocked');
    logAdminAction(admin.user_id, 'block_slot', 'slot', slotId, {});

    return { success: true, message: 'Slot blocked.' };

  } else if (action === 'unblock') {
    const slotId = sanitize(params.slot_id);
    const slot = findRow('CoachAvailability', 'slot_id', slotId);
    if (!slot) return { success: false, error: 'Slot not found.' };

    updateRow('CoachAvailability', slot._rowIndex, 'status', 'open');
    logAdminAction(admin.user_id, 'unblock_slot', 'slot', slotId, {});

    return { success: true, message: 'Slot unblocked and available.' };
  }

  return { success: false, error: 'slot_action must be: add, block, or unblock.' };
}


function adminGetBookings(params) {
  const admin = requireAdmin(params);
  const statusFilter = sanitize(params.status);

  let bookings = getAllRows('Bookings');
  if (statusFilter) {
    bookings = bookings.filter(b => b.status === statusFilter);
  }

  return {
    success: true,
    bookings: bookings.map(b => {
      const user = findRow('Users', 'user_id', b.user_id);
      return {
        booking_id: b.booking_id,
        student: user ? user.display_name : b.user_id,
        student_email: user ? user.email : '',
        date: b.date,
        start_time: b.start_time,
        end_time: b.end_time,
        platform: b.platform,
        meet_link: b.meet_link,
        status: b.status,
        notes: b.notes,
        created_at: b.created_at
      };
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  };
}


function adminUpdateBooking(params) {
  const admin = requireAdmin(params);
  const bookingId = sanitize(params.booking_id);
  const updates = {};

  if (params.meet_link) updates.meet_link = sanitize(params.meet_link);
  if (params.status) updates.status = sanitize(params.status);

  if (!bookingId) return { success: false, error: 'booking_id is required.' };

  const booking = findRow('Bookings', 'booking_id', bookingId);
  if (!booking) return { success: false, error: 'Booking not found.' };

  updateMultipleColumns('Bookings', booking._rowIndex, updates);

  if (updates.meet_link) {
    const user = findRow('Users', 'user_id', booking.user_id);
    if (user) {
      sendMeetLinkEmail(user.email, user.display_name, booking.date, booking.start_time, updates.meet_link, booking.platform);
    }
  }

  logAdminAction(admin.user_id, 'update_booking', 'booking', bookingId, updates);

  return { success: true, message: 'Booking updated!' };
}



// =============================================================================
// SECTION 9: CERTIFICATES — Auto PDF generation
// =============================================================================

function getCertificates(params) {
  const user = requireAuth(params);
  const certs = findRows('Certificates', 'user_id', user.user_id);

  return {
    success: true,
    certificates: certs.map(c => ({
      cert_id: c.cert_id,
      tier_completed: c.tier_completed,
      student_name: c.student_name,
      issued_date: c.issued_date,
      verification_code: c.verification_code,
      pdf_url: c.pdf_url,
      modules_completed: Number(c.modules_completed),
      average_score: Number(c.average_score)
    }))
  };
}


function generateCertificate(params) {
  const user = requireAuth(params);
  const tier = sanitize(params.tier);

  if (!tier || !['free', 'pro', 'master'].includes(tier)) {
    return { success: false, error: 'Invalid tier.' };
  }

  const existingCert = findRows('Certificates', 'user_id', user.user_id)
    .find(c => c.tier_completed === tier);
  if (existingCert) {
    return {
      success: true,
      message: 'You already have this certificate!',
      certificate: {
        cert_id: existingCert.cert_id,
        pdf_url: existingCert.pdf_url,
        verification_code: existingCert.verification_code
      }
    };
  }

  const tierModules = getAllRows('Modules')
    .filter(m => m.tier_required === tier && (m.is_published === true || m.is_published === 'TRUE'));

  const completedModules = findRows('UserProgress', 'user_id', user.user_id)
    .filter(p => p.type === 'module_complete');

  const allComplete = tierModules.every(m =>
    completedModules.some(c => c.module_id === m.module_id)
  );

  if (!allComplete) {
    return { success: false, error: 'Complete all ' + tier.toUpperCase() + ' modules first.' };
  }

  const quizScores = findRows('UserProgress', 'user_id', user.user_id)
    .filter(p => p.type === 'quiz_attempt' && tierModules.some(m => m.module_id === p.module_id))
    .map(p => Number(p.quiz_score) || 0);
  const avgScore = quizScores.length > 0
    ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length)
    : 0;

  const certId = getNextId('DMAC-CERT-', 'Certificates', 'cert_id');
  const verificationCode = generateVerificationCode();
  const studentName = user.first_name + ' ' + user.last_name;

  const pdfUrl = createCertificatePDF(certId, studentName, tier, avgScore, verificationCode);

  appendRow_('Certificates', [
    certId, user.user_id, tier, studentName, now(),
    verificationCode, pdfUrl, tierModules.length, avgScore
  ]);

  sendCertificateEmail(user.email, user.display_name, tier, pdfUrl, verificationCode);

  return {
    success: true,
    message: 'Certificate generated! Congratulations, ' + user.display_name + '!',
    certificate: {
      cert_id: certId,
      tier: tier,
      student_name: studentName,
      verification_code: verificationCode,
      pdf_url: pdfUrl,
      average_score: avgScore
    }
  };
}


function createCertificatePDF(certId, studentName, tier, avgScore, verificationCode) {
  try {
    const tierNames = {
      'free': 'BASIC ARNIS',
      'pro': 'PROFESSIONAL ARNIS',
      'master': 'MASTER ARNIS'
    };

    const tierColors = {
      'free': '#0038A8',
      'pro': '#CE1126',
      'master': '#D4A017'
    };

    const issuedDate = new Date().toLocaleDateString('en-PH', {
      year: 'numeric', month: 'long', day: 'numeric'
    });

    const html = '<html><head><style>' +
      "@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=Lora:ital@0;1&display=swap');" +
      'body{width:11in;height:8.5in;margin:0;padding:40px;font-family:"Lora",serif;background:#0D0D0D;color:#FFF;display:flex;align-items:center;justify-content:center;box-sizing:border-box}' +
      '.cert{width:100%;height:100%;border:3px solid ' + tierColors[tier] + ';border-radius:8px;padding:50px;text-align:center;position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center}' +
      '.cert::before{content:"";position:absolute;inset:8px;border:1px solid ' + tierColors[tier] + '44;border-radius:4px}' +
      '.logo{font-size:14px;letter-spacing:4px;color:' + tierColors[tier] + ';margin-bottom:10px}' +
      '.academy{font-family:"Cinzel",serif;font-size:28px;letter-spacing:6px;margin-bottom:5px}' +
      '.sub{font-size:11px;color:#888;letter-spacing:3px;margin-bottom:30px}' +
      '.cert-title{font-size:16px;letter-spacing:5px;text-transform:uppercase;color:' + tierColors[tier] + ';margin-bottom:20px}' +
      '.tier-badge{font-family:"Cinzel",serif;font-size:24px;color:' + tierColors[tier] + ';font-weight:700;margin-bottom:15px}' +
      '.presented{font-size:12px;color:#888;margin-bottom:10px}' +
      '.student-name{font-family:"Cinzel",serif;font-size:36px;color:#FFF;margin-bottom:10px;border-bottom:2px solid ' + tierColors[tier] + '44;padding-bottom:10px}' +
      '.desc{font-size:13px;color:#CCC;max-width:500px;margin:15px auto;line-height:1.6}' +
      '.score{font-size:14px;color:' + tierColors[tier] + ';margin:10px 0}' +
      '.footer{font-size:10px;color:#666;margin-top:20px}' +
      '.footer .code{font-family:monospace;color:' + tierColors[tier] + '}' +
      '.sig{margin-top:20px;display:flex;justify-content:center;gap:100px}' +
      '.sig-item{text-align:center}' +
      '.sig-line{width:180px;border-top:1px solid #444;padding-top:5px;font-size:12px}' +
      '.sig-role{font-size:10px;color:#888}' +
      '</style></head><body>' +
      '<div class="cert">' +
      '<div class="logo">D-MAHARLIKA ARNIS CLUB</div>' +
      '<div class="academy">DMAC ACADEMY</div>' +
      '<div class="sub">GRIP. STRIKE. RISE.</div>' +
      '<div class="cert-title">CERTIFICATE OF COMPLETION</div>' +
      '<div class="tier-badge">' + tierNames[tier] + '</div>' +
      '<div class="presented">This certifies that</div>' +
      '<div class="student-name">' + studentName + '</div>' +
      '<div class="desc">has successfully completed all modules and assessments of the ' + tierNames[tier] + ' program at DMAC Academy, demonstrating proficiency in Filipino martial arts.</div>' +
      '<div class="score">Average Assessment Score: ' + avgScore + '%</div>' +
      '<div class="sig"><div class="sig-item"><div class="sig-line">Daniel Joseph C. Eugenio</div><div class="sig-role">Coach DJ — Head Instructor</div></div><div class="sig-item"><div class="sig-line">DMAC Academy</div><div class="sig-role">D-Maharlika Arnis Club</div></div></div>' +
      '<div class="footer">Issued: ' + issuedDate + ' | Certificate ID: ' + certId + ' | Verification: <span class="code">' + verificationCode + '</span></div>' +
      '</div></body></html>';

    const blob = HtmlService.createHtmlOutput(html)
      .getBlob()
      .setName(certId + '_' + studentName.replace(/\s/g, '_') + '.pdf')
      .getAs('application/pdf');

    let folder;
    const folders = DriveApp.getFoldersByName('DMAC Academy Certificates');
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder('DMAC Academy Certificates');
    }

    const file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return file.getUrl();

  } catch (err) {
    Logger.log('Certificate PDF error: ' + err.message);
    return 'PDF_GENERATION_ERROR: ' + err.message;
  }
}


function verifyCertificate(params) {
  const code = sanitize(params.code);

  if (!code) return { success: false, error: 'Verification code is required.' };

  const cert = findRow('Certificates', 'verification_code', code);
  if (!cert) {
    return { success: false, error: 'Invalid verification code. Certificate not found.' };
  }

  return {
    success: true,
    valid: true,
    certificate: {
      cert_id: cert.cert_id,
      student_name: cert.student_name,
      tier_completed: cert.tier_completed,
      issued_date: cert.issued_date,
      modules_completed: Number(cert.modules_completed),
      average_score: Number(cert.average_score)
    }
  };
}



// =============================================================================
// SECTION 10: DAILY CONTENT — Rotating quotes & Arnis facts
// =============================================================================

function getDailyQuote() {
  const quotes = getAllRows('DailyQuotes')
    .filter(q => q.is_active === true || q.is_active === 'TRUE');

  if (quotes.length === 0) {
    return {
      success: true,
      quote: { text: 'Grip. Strike. Rise.', author: 'DMAC Academy' }
    };
  }

  const dayOfYear = getDayOfYear();
  const index = dayOfYear % quotes.length;
  const quote = quotes[index];

  const row = findRow('DailyQuotes', 'quote_id', quote.quote_id);
  if (row) {
    updateRow('DailyQuotes', row._rowIndex, 'last_shown', formatDate(new Date()));
  }

  return {
    success: true,
    quote: {
      quote_id: quote.quote_id,
      text: quote.quote_text,
      author: quote.author,
      category: quote.category
    }
  };
}


function getDailyFact() {
  const facts = getAllRows('ArnisFacts')
    .filter(f => f.is_active === true || f.is_active === 'TRUE');

  if (facts.length === 0) {
    return {
      success: true,
      fact: { text: 'Arnis is the national martial art of the Philippines.', category: 'history' }
    };
  }

  const dayOfYear = getDayOfYear();
  const index = (dayOfYear + Math.floor(facts.length / 2)) % facts.length;
  const fact = facts[index];

  const row = findRow('ArnisFacts', 'fact_id', fact.fact_id);
  if (row) {
    updateRow('ArnisFacts', row._rowIndex, 'last_shown', formatDate(new Date()));
  }

  return {
    success: true,
    fact: {
      fact_id: fact.fact_id,
      text: fact.fact_text,
      category: fact.category,
      source: fact.source
    }
  };
}


function getDayOfYear() {
  const now_ = new Date();
  const start = new Date(now_.getFullYear(), 0, 0);
  const diff = now_ - start;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}


function adminAddQuote(params) {
  const admin = requireAdmin(params);
  const text = sanitize(params.quote_text);
  const author = sanitize(params.author) || 'Unknown';
  const category = sanitize(params.category) || 'general';

  if (!text) return { success: false, error: 'quote_text is required.' };

  const quoteId = getNextId('QT-', 'DailyQuotes', 'quote_id');
  appendRow_('DailyQuotes', [quoteId, text, author, category, 'TRUE', '']);

  logAdminAction(admin.user_id, 'add_quote', 'quote', quoteId, { text: text.substring(0, 50) });

  return { success: true, message: 'Quote added!', quote_id: quoteId };
}


function adminAddFact(params) {
  const admin = requireAdmin(params);
  const text = sanitize(params.fact_text);
  const category = sanitize(params.category) || 'trivia';
  const source = sanitize(params.source) || '';

  if (!text) return { success: false, error: 'fact_text is required.' };

  const factId = getNextId('AF-', 'ArnisFacts', 'fact_id');
  appendRow_('ArnisFacts', [factId, text, category, source, 'TRUE', '']);

  logAdminAction(admin.user_id, 'add_fact', 'fact', factId, { text: text.substring(0, 50) });

  return { success: true, message: 'Arnis fact added!', fact_id: factId };
}



// =============================================================================
// SECTION 11: ADMIN PANEL — User, content, stats management
// =============================================================================

function adminGetUsers(params) {
  const admin = requireAdmin(params);
  const filter = sanitize(params.filter);
  const search = sanitize(params.search);

  let users = getAllRows('Users');

  if (filter && filter !== 'all') {
    if (filter === 'admin') {
      users = users.filter(u => u.role === 'admin');
    } else {
      users = users.filter(u => u.tier === filter);
    }
  }

  if (search) {
    const s = search.toLowerCase();
    users = users.filter(u =>
      (u.email || '').toLowerCase().includes(s) ||
      (u.display_name || '').toLowerCase().includes(s) ||
      (u.first_name || '').toLowerCase().includes(s) ||
      (u.last_name || '').toLowerCase().includes(s) ||
      (u.user_id || '').toLowerCase().includes(s)
    );
  }

  return {
    success: true,
    total: users.length,
    users: users.map(u => ({
      user_id: u.user_id,
      email: u.email,
      display_name: u.display_name,
      first_name: u.first_name,
      last_name: u.last_name,
      phone: u.phone,
      role: u.role,
      tier: u.tier,
      tier_status: u.tier_status,
      is_active: u.is_active,
      registered_at: u.registered_at,
      last_login: u.last_login
    }))
  };
}


function adminUpdateUser(params) {
  const admin = requireAdmin(params);
  const targetUserId = sanitize(params.target_user_id);

  if (!targetUserId) return { success: false, error: 'target_user_id is required.' };

  const user = findRow('Users', 'user_id', targetUserId);
  if (!user) return { success: false, error: 'User not found.' };

  const updates = {};
  const allowedFields = ['tier', 'tier_status', 'role', 'is_active', 'display_name', 'phone'];

  allowedFields.forEach(field => {
    if (params[field] !== undefined) {
      updates[field] = sanitize(String(params[field]));
    }
  });

  if (Object.keys(updates).length === 0) {
    return { success: false, error: 'No fields to update.' };
  }

  updateMultipleColumns('Users', user._rowIndex, updates);

  logAdminAction(admin.user_id, 'update_user', 'user', targetUserId, updates);

  return { success: true, message: 'User updated!', updates: updates };
}


function adminAddModule(params) {
  const admin = requireAdmin(params);
  const title = sanitize(params.title);
  const description = sanitize(params.description);
  const tierRequired = sanitize(params.tier_required) || 'free';
  const passingScore = Number(params.passing_score) || 70;

  if (!title) return { success: false, error: 'Module title is required.' };

  const allModules = getAllRows('Modules');
  const orderIndex = allModules.length + 1;

  const moduleId = getNextId('MOD-', 'Modules', 'module_id');

  appendRow_('Modules', [
    moduleId, title, description || '', tierRequired, orderIndex,
    0, passingScore, params.is_published || 'FALSE', now(), ''
  ]);

  logAdminAction(admin.user_id, 'add_module', 'module', moduleId, { title });

  return { success: true, message: 'Module created!', module_id: moduleId };
}


function adminUpdateModule(params) {
  const admin = requireAdmin(params);
  const moduleId = sanitize(params.module_id);

  if (!moduleId) return { success: false, error: 'module_id is required.' };

  const mod = findRow('Modules', 'module_id', moduleId);
  if (!mod) return { success: false, error: 'Module not found.' };

  const updates = {};
  ['title', 'description', 'tier_required', 'order_index', 'passing_score', 'is_published'].forEach(field => {
    if (params[field] !== undefined) updates[field] = params[field];
  });

  if (Object.keys(updates).length === 0) {
    return { success: false, error: 'No fields to update.' };
  }

  updates.updated_at = now();
  updateMultipleColumns('Modules', mod._rowIndex, updates);

  logAdminAction(admin.user_id, 'update_module', 'module', moduleId, updates);

  return { success: true, message: 'Module updated!' };
}


function adminAddLesson(params) {
  const admin = requireAdmin(params);
  const moduleId = sanitize(params.module_id);
  const title = sanitize(params.title);

  if (!moduleId || !title) {
    return { success: false, error: 'module_id and title are required.' };
  }

  const moduleLessons = findRows('Lessons', 'module_id', moduleId);
  const orderIndex = moduleLessons.length + 1;

  const lessonId = getNextId('LES-', 'Lessons', 'lesson_id');

  appendRow_('Lessons', [
    lessonId, moduleId, title, orderIndex,
    sanitize(params.video_url) || '',
    sanitize(params.audio_url) || '',
    sanitize(params.read_content) || '',
    sanitize(params.read_url) || '',
    Number(params.duration_mins) || 0,
    params.is_published || 'FALSE',
    now()
  ]);

  const mod = findRow('Modules', 'module_id', moduleId);
  if (mod) {
    updateRow('Modules', mod._rowIndex, 'total_lessons', orderIndex);
  }

  logAdminAction(admin.user_id, 'add_lesson', 'lesson', lessonId, { title, moduleId });

  return { success: true, message: 'Lesson added!', lesson_id: lessonId };
}


function adminUpdateLesson(params) {
  const admin = requireAdmin(params);
  const lessonId = sanitize(params.lesson_id);

  if (!lessonId) return { success: false, error: 'lesson_id is required.' };

  const lesson = findRow('Lessons', 'lesson_id', lessonId);
  if (!lesson) return { success: false, error: 'Lesson not found.' };

  const updates = {};
  ['title', 'video_url', 'audio_url', 'read_content', 'read_url', 'duration_mins', 'order_index', 'is_published'].forEach(field => {
    if (params[field] !== undefined) updates[field] = params[field];
  });

  updateMultipleColumns('Lessons', lesson._rowIndex, updates);

  logAdminAction(admin.user_id, 'update_lesson', 'lesson', lessonId, updates);

  return { success: true, message: 'Lesson updated!' };
}


function adminAddQuiz(params) {
  const admin = requireAdmin(params);
  const moduleId = sanitize(params.module_id);
  const title = sanitize(params.title);

  if (!moduleId || !title) {
    return { success: false, error: 'module_id and title are required.' };
  }

  const existing = findRow('Quizzes', 'module_id', moduleId);
  if (existing) {
    return { success: false, error: 'A quiz already exists for this module. Update it instead.' };
  }

  const quizId = getNextId('QZ-', 'Quizzes', 'quiz_id');

  appendRow_('Quizzes', [
    quizId, moduleId, title,
    sanitize(params.description) || '',
    0,
    Number(params.time_limit_mins) || 10,
    Number(params.max_attempts) || 3,
    params.is_published || 'FALSE',
    now()
  ]);

  logAdminAction(admin.user_id, 'add_quiz', 'quiz', quizId, { title, moduleId });

  return { success: true, message: 'Quiz created!', quiz_id: quizId };
}


function adminAddQuestion(params) {
  const admin = requireAdmin(params);
  const quizId = sanitize(params.quiz_id);
  const questionText = sanitize(params.question_text);

  if (!quizId || !questionText) {
    return { success: false, error: 'quiz_id and question_text are required.' };
  }

  if (!params.option_a || !params.option_b || !params.correct_answer) {
    return { success: false, error: 'At least option_a, option_b, and correct_answer are required.' };
  }

  const existing = findRows('QuizQuestions', 'quiz_id', quizId);
  const orderIndex = existing.length + 1;

  const questionId = getNextId('QQ-', 'QuizQuestions', 'question_id');

  appendRow_('QuizQuestions', [
    questionId, quizId, questionText,
    sanitize(params.option_a),
    sanitize(params.option_b),
    sanitize(params.option_c) || '',
    sanitize(params.option_d) || '',
    sanitize(params.correct_answer).toLowerCase(),
    sanitize(params.explanation) || '',
    orderIndex
  ]);

  const quiz = findRow('Quizzes', 'quiz_id', quizId);
  if (quiz) {
    updateRow('Quizzes', quiz._rowIndex, 'total_questions', orderIndex);
  }

  logAdminAction(admin.user_id, 'add_question', 'question', questionId, { quizId });

  return { success: true, message: 'Question added!', question_id: questionId };
}


function adminGetLogs(params) {
  const admin = requireAdmin(params);
  const limit = Number(params.limit) || 50;

  const logs = getAllRows('AdminLogs')
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);

  return {
    success: true,
    logs: logs.map(l => {
      const adminUser = findRow('Users', 'user_id', l.admin_id);
      return {
        log_id: l.log_id,
        admin: adminUser ? adminUser.display_name : l.admin_id,
        action: l.action,
        target_type: l.target_type,
        target_id: l.target_id,
        details: l.details,
        timestamp: l.timestamp
      };
    })
  };
}


function adminGetStats(params) {
  const admin = requireAdmin(params);

  const users = getAllRows('Users');
  const students = users.filter(u => u.role === 'student');
  const payments = getAllRows('Payments');
  const bookings = getAllRows('Bookings');
  const subs = getAllRows('Subscriptions');

  const now_ = new Date();
  const thirtyDaysAgo = new Date(now_.getTime() - 30 * 24 * 60 * 60 * 1000);

  const recentPayments = payments.filter(p =>
    p.status === 'paid' && new Date(p.paid_at) > thirtyDaysAgo
  );
  const monthlyRevenue = recentPayments.reduce((sum, p) => sum + Number(p.amount), 0);

  const activeSubCount = subs.filter(s => s.status === 'active' && !isExpired(s.end_date)).length;

  const newStudents = students.filter(u => new Date(u.registered_at) > thirtyDaysAgo).length;

  const tierBreakdown = {
    free: students.filter(u => u.tier === 'free').length,
    pro: students.filter(u => u.tier === 'pro').length,
    master: students.filter(u => u.tier === 'master').length
  };

  const upcomingBookings = bookings.filter(b =>
    (b.status === 'confirmed' || b.status === 'pending') && !isExpired(b.date)
  ).length;

  return {
    success: true,
    stats: {
      total_students: students.length,
      new_students_30d: newStudents,
      active_subscribers: activeSubCount,
      monthly_revenue: monthlyRevenue,
      tier_breakdown: tierBreakdown,
      total_payments: payments.length,
      pending_payments: payments.filter(p => p.status === 'pending').length,
      upcoming_bookings: upcomingBookings,
      total_bookings: bookings.length
    }
  };
}


function adminGetPayments(params) {
  const admin = requireAdmin(params);
  const statusFilter = sanitize(params.status);

  let payments = getAllRows('Payments');
  if (statusFilter) {
    payments = payments.filter(p => p.status === statusFilter);
  }

  return {
    success: true,
    payments: payments.map(p => {
      const user = findRow('Users', 'user_id', p.user_id);
      return {
        payment_id: p.payment_id,
        student: user ? user.display_name : p.user_id,
        student_email: user ? user.email : '',
        type: p.type,
        amount: Number(p.amount),
        method: p.method,
        status: p.status,
        paid_at: p.paid_at,
        created_at: p.created_at,
        notes: p.notes
      };
    }).sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  };
}



// =============================================================================
// SECTION 12: EMAIL NOTIFICATIONS — Branded templates
// =============================================================================

const ACADEMY_NAME = 'DMAC Academy';
const ACADEMY_EMAIL_NAME = 'DMAC Academy | D-Maharlika Arnis Club';
const ADMIN_EMAIL = 'vineycrz015@gmail.com';

function sendBrandedEmail(to, subject, bodyHtml) {
  const fullHtml = '<div style="font-family:\'Segoe UI\',Arial,sans-serif;background:#0D0D0D;color:#FFF;padding:0;margin:0;">' +
    '<div style="max-width:600px;margin:0 auto;background:#1A1A1A;border-radius:8px;overflow:hidden;">' +
    '<div style="background:#0D0D0D;padding:24px;text-align:center;border-bottom:2px solid #CE1126;">' +
    '<h1 style="margin:0;font-size:24px;letter-spacing:3px;color:#FFF;">DMAC ACADEMY</h1>' +
    '<p style="margin:4px 0 0;font-size:11px;letter-spacing:2px;color:#D4A017;">GRIP. STRIKE. RISE.</p></div>' +
    '<div style="padding:32px 24px;">' + bodyHtml + '</div>' +
    '<div style="background:#0D0D0D;padding:16px 24px;text-align:center;border-top:1px solid #2A2A2A;">' +
    '<p style="margin:0;font-size:11px;color:#666;">D-Maharlika Arnis Club &bull; Est. 2021<br>' +
    '<span style="color:#0038A8;">Grip.</span> <span style="color:#CE1126;">Strike.</span> <span style="color:#D4A017;">Rise.</span></p></div>' +
    '</div></div>';

  try {
    GmailApp.sendEmail(to, subject, '', {
      htmlBody: fullHtml,
      name: ACADEMY_EMAIL_NAME
    });
    return true;
  } catch (err) {
    Logger.log('Email error: ' + err.message);
    return false;
  }
}


function sendWelcomeEmail(email, displayName) {
  const body = '<h2 style="color:#CE1126;margin-top:0;">Welcome, ' + displayName + '!</h2>' +
    '<p style="color:#CCC;line-height:1.6;">You\'re now part of the DMAC Academy family — the online home of <strong style="color:#FFF;">D-Maharlika Arnis Club</strong>.</p>' +
    '<p style="color:#CCC;line-height:1.6;">Your journey as an <strong style="color:#D4A017;">Arnisador</strong> begins here. You have access to our Free tier modules where you\'ll learn the fundamentals of Filipino martial arts.</p>' +
    '<div style="background:#0D0D0D;border-left:3px solid #D4A017;padding:16px;margin:20px 0;border-radius:0 4px 4px 0;">' +
    '<p style="margin:0;color:#CCC;"><strong style="color:#D4A017;">What\'s next?</strong><br>' +
    'Explore Module 1: Introduction to Arnis<br>Complete lessons and take the quiz<br>Upgrade to Pro or Master for advanced techniques</p></div>' +
    '<p style="color:#CCC;">Train hard. Stay disciplined.<br><strong style="color:#CE1126;">— Coach DJ & Team DMAC</strong></p>';
  sendBrandedEmail(email, 'Welcome to DMAC Academy!', body);
}


function sendSubscriptionEmail(email, displayName, tier, subType, amount) {
  const tierUpper = tier.toUpperCase();
  const action = subType === 'renewal' ? 'renewed' : subType === 'upgrade' ? 'upgraded to' : 'subscribed to';
  const body = '<h2 style="color:#D4A017;margin-top:0;">' + tierUpper + ' Tier Activated!</h2>' +
    '<p style="color:#CCC;line-height:1.6;">Hey ' + displayName + '! You\'ve successfully ' + action + ' the <strong style="color:#D4A017;">' + tierUpper + '</strong> tier.</p>' +
    '<div style="background:#0D0D0D;padding:16px;border-radius:4px;margin:20px 0;">' +
    '<table style="width:100%;color:#CCC;font-size:14px;">' +
    '<tr><td style="padding:4px 0;color:#888;">Plan:</td><td style="text-align:right;color:#FFF;">' + tierUpper + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Amount:</td><td style="text-align:right;color:#D4A017;">₱' + amount + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Duration:</td><td style="text-align:right;color:#FFF;">30 days</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Type:</td><td style="text-align:right;color:#FFF;">' + subType + '</td></tr></table></div>' +
    '<p style="color:#CCC;">New ' + tierUpper + ' modules and content are now unlocked. Keep training!</p>';
  sendBrandedEmail(email, tierUpper + ' Tier Activated — DMAC Academy', body);
}


function sendPaymentConfirmationEmail(email, displayName, amount, method) {
  const body = '<h2 style="color:#2D9B4E;margin-top:0;">Payment Confirmed</h2>' +
    '<p style="color:#CCC;">Hey ' + displayName + ', your payment has been verified!</p>' +
    '<div style="background:#0D0D0D;padding:16px;border-radius:4px;margin:20px 0;">' +
    '<table style="width:100%;color:#CCC;font-size:14px;">' +
    '<tr><td style="padding:4px 0;color:#888;">Amount:</td><td style="text-align:right;color:#D4A017;">₱' + amount + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Method:</td><td style="text-align:right;color:#FFF;">' + method + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Date:</td><td style="text-align:right;color:#FFF;">' + new Date().toLocaleDateString('en-PH') + '</td></tr></table></div>';
  sendBrandedEmail(email, 'Payment Confirmed — DMAC Academy', body);
}


function sendExpiryEmail(email, displayName, tier) {
  const body = '<h2 style="color:#CE1126;margin-top:0;">Subscription Expired</h2>' +
    '<p style="color:#CCC;line-height:1.6;">Hey ' + displayName + ', your <strong>' + tier.toUpperCase() + '</strong> subscription has expired. You\'ve been moved back to the Free tier.</p>' +
    '<p style="color:#CCC;line-height:1.6;">Don\'t let your training stop! Renew now to continue accessing all your unlocked content and lessons.</p>' +
    '<div style="text-align:center;margin:24px 0;"><a href="https://dmacacademy.github.io/subscribe" style="display:inline-block;padding:12px 32px;background:#CE1126;color:#FFF;text-decoration:none;border-radius:6px;font-weight:bold;font-size:14px;">Renew Now</a></div>';
  sendBrandedEmail(email, 'Subscription Expired — DMAC Academy', body);
}


function sendPasswordResetEmail(email, displayName, resetToken) {
  const resetLink = 'https://dmacacademy.github.io/reset-password?token=' + resetToken;
  const body = '<h2 style="color:#0038A8;margin-top:0;">Password Reset Request</h2>' +
    '<p style="color:#CCC;line-height:1.6;">Hey ' + displayName + ', we received a request to reset your password. Use the code below or click the button to reset it.</p>' +
    '<div style="text-align:center;margin:24px 0;"><div style="background:#0D0D0D;display:inline-block;padding:16px 32px;border-radius:4px;border:1px solid #2A2A2A;">' +
    '<span style="font-family:monospace;font-size:24px;letter-spacing:4px;color:#D4A017;">' + resetToken + '</span></div></div>' +
    '<div style="text-align:center;margin:24px 0;"><a href="' + resetLink + '" style="display:inline-block;padding:12px 32px;background:#0038A8;color:#FFF;text-decoration:none;border-radius:6px;font-weight:bold;font-size:14px;">Reset Password</a></div>' +
    '<p style="color:#888;font-size:12px;">This code expires in 1 hour. If you didn\'t request this, you can safely ignore it.</p>';
  sendBrandedEmail(email, 'Password Reset — DMAC Academy', body);
}


function sendBookingConfirmationEmail(email, displayName, date, startTime, endTime, platform) {
  const platformName = platform === 'zoom' ? 'Zoom' : 'Google Meet';
  const body = '<h2 style="color:#D4A017;margin-top:0;">Session Booked!</h2>' +
    '<p style="color:#CCC;line-height:1.6;">Hey ' + displayName + ', your live session with <strong style="color:#FFF;">Coach DJ</strong> is confirmed!</p>' +
    '<div style="background:#0D0D0D;padding:16px;border-radius:4px;margin:20px 0;">' +
    '<table style="width:100%;color:#CCC;font-size:14px;">' +
    '<tr><td style="padding:4px 0;color:#888;">Date:</td><td style="text-align:right;color:#FFF;">' + date + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Time:</td><td style="text-align:right;color:#FFF;">' + startTime + ' – ' + endTime + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Platform:</td><td style="text-align:right;color:#FFF;">' + platformName + '</td></tr></table></div>' +
    '<p style="color:#CCC;">The meeting link will be sent to you before the session. Prepare your sticks!</p>';
  sendBrandedEmail(email, 'Live Session Booked — ' + date, body);
}


function sendMeetLinkEmail(email, displayName, date, startTime, meetLink, platform) {
  const platformName = platform === 'zoom' ? 'Zoom' : 'Google Meet';
  const body = '<h2 style="color:#2D9B4E;margin-top:0;">Your Meeting Link is Ready!</h2>' +
    '<p style="color:#CCC;line-height:1.6;">Hey ' + displayName + ', Coach DJ has shared your ' + platformName + ' link for your session.</p>' +
    '<div style="background:#0D0D0D;padding:16px;border-radius:4px;margin:20px 0;">' +
    '<table style="width:100%;color:#CCC;font-size:14px;">' +
    '<tr><td style="padding:4px 0;color:#888;">Date:</td><td style="text-align:right;color:#FFF;">' + date + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Time:</td><td style="text-align:right;color:#FFF;">' + startTime + '</td></tr></table></div>' +
    '<div style="text-align:center;margin:24px 0;"><a href="' + meetLink + '" style="display:inline-block;padding:12px 32px;background:#2D9B4E;color:#FFF;text-decoration:none;border-radius:6px;font-weight:bold;font-size:14px;">Join Session</a></div>';
  sendBrandedEmail(email, 'Meeting Link Ready — ' + date, body);
}


function sendBookingNotificationToAdmin(studentName, date, startTime, platform) {
  const body = '<h2 style="color:#0038A8;margin-top:0;">New Booking!</h2>' +
    '<p style="color:#CCC;"><strong style="color:#FFF;">' + studentName + '</strong> just booked a live session.</p>' +
    '<div style="background:#0D0D0D;padding:16px;border-radius:4px;margin:20px 0;">' +
    '<table style="width:100%;color:#CCC;font-size:14px;">' +
    '<tr><td style="padding:4px 0;color:#888;">Student:</td><td style="text-align:right;color:#FFF;">' + studentName + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Date:</td><td style="text-align:right;color:#FFF;">' + date + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Time:</td><td style="text-align:right;color:#FFF;">' + startTime + '</td></tr>' +
    '<tr><td style="padding:4px 0;color:#888;">Platform:</td><td style="text-align:right;color:#FFF;">' + platform + '</td></tr></table></div>' +
    '<p style="color:#CCC;">Please add the meeting link through the Admin Portal.</p>';
  sendBrandedEmail(ADMIN_EMAIL, 'New Booking: ' + studentName + ' — ' + date, body);
}


function sendCertificateEmail(email, displayName, tier, pdfUrl, verificationCode) {
  const tierUpper = tier.toUpperCase();
  const body = '<h2 style="color:#D4A017;margin-top:0;">Certificate Earned!</h2>' +
    '<p style="color:#CCC;line-height:1.6;">Congratulations, <strong style="color:#FFF;">' + displayName + '</strong>! You\'ve completed all <strong style="color:#D4A017;">' + tierUpper + '</strong> modules and earned your certificate!</p>' +
    '<div style="background:#0D0D0D;padding:16px;border-radius:4px;margin:20px 0;text-align:center;">' +
    '<p style="color:#888;font-size:12px;margin-bottom:8px;">VERIFICATION CODE</p>' +
    '<p style="font-family:monospace;font-size:20px;color:#D4A017;letter-spacing:3px;margin:0;">' + verificationCode + '</p></div>' +
    '<div style="text-align:center;margin:24px 0;"><a href="' + pdfUrl + '" style="display:inline-block;padding:12px 32px;background:#D4A017;color:#0D0D0D;text-decoration:none;border-radius:6px;font-weight:bold;font-size:14px;">Download Certificate (PDF)</a></div>' +
    '<p style="color:#CCC;">Share your achievement with pride. You\'ve earned it, warrior!</p>';
  sendBrandedEmail(email, tierUpper + ' Certificate — DMAC Academy', body);
}



// =============================================================================
// SECTION 13: SHEET SETUP — Run setupAllSheets() once
// =============================================================================

function setupAllSheets() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  const sheetsConfig = {
    'Users': [
      'user_id', 'email', 'password_hash', 'first_name', 'last_name', 'display_name',
      'phone', 'profile_photo_url', 'role', 'tier', 'tier_status',
      'trial_start', 'trial_end', 'registered_at', 'last_login',
      'is_active', 'reset_token', 'reset_token_expiry'
    ],
    'Subscriptions': [
      'sub_id', 'user_id', 'tier', 'type', 'amount', 'payment_id',
      'start_date', 'end_date', 'is_intro', 'status', 'created_at'
    ],
    'Payments': [
      'payment_id', 'user_id', 'type', 'amount', 'method',
      'paymongo_ref', 'paymongo_link', 'status', 'paid_at', 'created_at', 'notes'
    ],
    'Modules': [
      'module_id', 'title', 'description', 'tier_required', 'order_index',
      'total_lessons', 'passing_score', 'is_published', 'created_at', 'updated_at'
    ],
    'Lessons': [
      'lesson_id', 'module_id', 'title', 'order_index', 'video_url',
      'audio_url', 'read_content', 'read_url', 'duration_mins',
      'is_published', 'created_at'
    ],
    'Quizzes': [
      'quiz_id', 'module_id', 'title', 'description', 'total_questions',
      'time_limit_mins', 'max_attempts', 'is_published', 'created_at'
    ],
    'QuizQuestions': [
      'question_id', 'quiz_id', 'question_text', 'option_a', 'option_b',
      'option_c', 'option_d', 'correct_answer', 'explanation', 'order_index'
    ],
    'UserProgress': [
      'progress_id', 'user_id', 'module_id', 'lesson_id', 'type',
      'quiz_score', 'quiz_passed', 'learning_mode', 'completed_at'
    ],
    'Bookings': [
      'booking_id', 'user_id', 'slot_id', 'payment_id', 'date',
      'start_time', 'end_time', 'platform', 'meet_link',
      'status', 'notes', 'created_at'
    ],
    'CoachAvailability': [
      'slot_id', 'date', 'start_time', 'end_time', 'hourly_rate',
      'status', 'booked_by', 'created_at'
    ],
    'Certificates': [
      'cert_id', 'user_id', 'tier_completed', 'student_name', 'issued_date',
      'verification_code', 'pdf_url', 'modules_completed', 'average_score'
    ],
    'DailyQuotes': [
      'quote_id', 'quote_text', 'author', 'category', 'is_active', 'last_shown'
    ],
    'ArnisFacts': [
      'fact_id', 'fact_text', 'category', 'source', 'is_active', 'last_shown'
    ],
    'AdminLogs': [
      'log_id', 'admin_id', 'action', 'target_type', 'target_id',
      'details', 'timestamp'
    ]
  };

  const created = [];
  const existing = [];

  for (const [sheetName, headers] of Object.entries(sheetsConfig)) {
    let sheet = ss.getSheetByName(sheetName);
    if (sheet) {
      existing.push(sheetName);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    } else {
      sheet = ss.insertSheet(sheetName);
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

      const headerRange = sheet.getRange(1, 1, 1, headers.length);
      headerRange.setBackground('#1A1A1A');
      headerRange.setFontColor('#FFFFFF');
      headerRange.setFontWeight('bold');
      headerRange.setFontSize(10);
      sheet.setFrozenRows(1);

      for (let i = 1; i <= headers.length; i++) {
        sheet.autoResizeColumn(i);
      }

      created.push(sheetName);
    }
  }

  const sheet1 = ss.getSheetByName('Sheet1');
  if (sheet1 && ss.getSheets().length > 1) {
    try { ss.deleteSheet(sheet1); } catch(e) { /* ignore */ }
  }

  insertDummyData(ss);

  return {
    success: true,
    message: 'Setup complete! Created ' + created.length + ' sheets.',
    created: created,
    existing: existing
  };
}


function insertDummyData(ss) {
  const timestamp = new Date().toISOString();

  // --- Admin: Divine ---
  appendToSheet(ss, 'Users', [
    'DMAC-00001', 'vineycrz015@gmail.com', hashPassword('admin123'),
    'Divine', 'Admin', 'Divine', '', '', 'admin', 'master', 'active',
    '', '', timestamp, timestamp, 'TRUE', '', ''
  ]);

  // --- Admin: Coach DJ ---
  appendToSheet(ss, 'Users', [
    'DMAC-00002', 'coachdj@dmacacademy.com', hashPassword('admin123'),
    'Daniel Joseph', 'Eugenio', 'Coach DJ', '', '', 'admin', 'master', 'active',
    '', '', timestamp, timestamp, 'TRUE', '', ''
  ]);

  // --- Sample student ---
  appendToSheet(ss, 'Users', [
    'DMAC-00003', 'student@test.com', hashPassword('test123'),
    'Juan', 'Dela Cruz', 'Juan', '09171234567', '', 'student', 'free', 'active',
    '', '', timestamp, timestamp, 'TRUE', '', ''
  ]);

  // --- 10 Modules (Free / Pro / Master) ---
  const modules = [
    ['MOD-001', 'Introduction to Arnis', 'History, philosophy, and the warrior spirit of Filipino martial arts.', 'free', 1, 3, 70, 'TRUE', timestamp, ''],
    ['MOD-002', 'Basic Stances & Footwork', 'Foundation stances, proper grip, and movement patterns.', 'free', 2, 3, 70, 'TRUE', timestamp, ''],
    ['MOD-003', 'The 12 Basic Strikes', 'Master the 12 angles of attack — the core of Arnis combat.', 'free', 3, 4, 70, 'TRUE', timestamp, ''],
    ['MOD-004', 'Defensive Techniques', 'Blocks, parries, and counter-strikes for every angle.', 'pro', 4, 4, 75, 'TRUE', timestamp, ''],
    ['MOD-005', 'Sinawali (Double Stick)', 'Weaving patterns, coordination drills, and flow combinations.', 'pro', 5, 3, 75, 'TRUE', timestamp, ''],
    ['MOD-006', 'Disarming Techniques', 'Strip and lock techniques to disarm your opponent.', 'pro', 6, 3, 75, 'TRUE', timestamp, ''],
    ['MOD-007', 'Espada y Daga', 'Sword and dagger — the art of fighting with two different weapons.', 'pro', 7, 3, 80, 'TRUE', timestamp, ''],
    ['MOD-008', 'Advanced Combinations', 'Chain strikes, feints, and advanced flow drills.', 'master', 8, 4, 80, 'TRUE', timestamp, ''],
    ['MOD-009', 'Sparring Fundamentals', 'Controlled sparring, timing, distance management, and strategy.', 'master', 9, 3, 80, 'TRUE', timestamp, ''],
    ['MOD-010', 'Tournament Preparation', 'Competition rules, scoring, match strategy, and mental conditioning.', 'master', 10, 4, 85, 'TRUE', timestamp, ''],
  ];
  modules.forEach(m => appendToSheet(ss, 'Modules', m));

  // --- 3 Sample Lessons for MOD-001 ---
  const lessons = [
    ['LES-001', 'MOD-001', 'What is Arnis?', 1, 'https://drive.google.com/placeholder-video-1', 'https://drive.google.com/placeholder-audio-1', '<p>Arnis, also known as Eskrima or Kali, is the national martial art of the Philippines...</p>', '', 15, 'TRUE', timestamp],
    ['LES-002', 'MOD-001', 'The History of Filipino Martial Arts', 2, 'https://drive.google.com/placeholder-video-2', 'https://drive.google.com/placeholder-audio-2', '<p>From pre-colonial warriors to modern-day competition...</p>', '', 20, 'TRUE', timestamp],
    ['LES-003', 'MOD-001', 'The Warrior Code & Philosophy', 3, 'https://drive.google.com/placeholder-video-3', 'https://drive.google.com/placeholder-audio-3', '<p>Discipline, respect, and the martial spirit that defines a true arnisador...</p>', '', 12, 'TRUE', timestamp],
  ];
  lessons.forEach(l => appendToSheet(ss, 'Lessons', l));

  // --- 1 Quiz + 5 Questions ---
  appendToSheet(ss, 'Quizzes', [
    'QZ-001', 'MOD-001', 'Introduction to Arnis Quiz', 'Test your knowledge of Arnis history and philosophy.', 5, 10, 3, 'TRUE', timestamp
  ]);

  const questions = [
    ['QQ-001', 'QZ-001', 'What is the national martial art of the Philippines?', 'Karate', 'Taekwondo', 'Arnis', 'Judo', 'c', 'Arnis (also called Eskrima/Kali) was declared the Philippine national martial art in 2009.', 1],
    ['QQ-002', 'QZ-001', 'Arnis is also known as:', 'Kung Fu and Wushu', 'Eskrima and Kali', 'Aikido and Judo', 'Muay Thai and Kickboxing', 'b', 'Arnis, Eskrima, and Kali are different names for the same Filipino martial art.', 2],
    ['QQ-003', 'QZ-001', 'How many basic striking angles are there in Arnis?', '8', '10', '12', '15', 'c', 'The 12 angles of attack form the foundation of Arnis striking techniques.', 3],
    ['QQ-004', 'QZ-001', 'What year was Arnis declared the national sport of the Philippines?', '2005', '2009', '2012', '2000', 'b', 'Republic Act No. 9850 declared Arnis as the Philippine National Martial Art and Sport in 2009.', 4],
    ['QQ-005', 'QZ-001', 'What is "Sinawali" in Arnis?', 'A type of kick', 'A double-stick weaving pattern', 'A throwing technique', 'A meditation practice', 'b', 'Sinawali means "to weave" and refers to double-stick coordination drills.', 5],
  ];
  questions.forEach(q => appendToSheet(ss, 'QuizQuestions', q));

  // --- 7 Daily Quotes ---
  const quotes = [
    ['QT-001', 'The warrior does not give up what he loves. He finds the love in what he does.', 'Dan Millman', 'discipline', 'TRUE', ''],
    ['QT-002', 'Ang hindi marunong lumingon sa pinanggalingan ay hindi makararating sa paroroonan.', 'Filipino Proverb', 'general', 'TRUE', ''],
    ['QT-003', 'A true martial artist is not one who fears fighting, but one who fights fear.', 'Unknown', 'martial_arts', 'TRUE', ''],
    ['QT-004', 'Grip. Strike. Rise.', 'DMAC Academy', 'arnis', 'TRUE', ''],
    ['QT-005', 'The stick is just an extension of the hand, and the hand is an extension of the warrior\'s will.', 'Grandmaster Remy Presas', 'arnis', 'TRUE', ''],
    ['QT-006', 'Discipline is the bridge between goals and accomplishment.', 'Jim Rohn', 'discipline', 'TRUE', ''],
    ['QT-007', 'In every battle, the warrior within must conquer the warrior without.', 'Unknown', 'martial_arts', 'TRUE', ''],
  ];
  quotes.forEach(q => appendToSheet(ss, 'DailyQuotes', q));

  // --- 7 Arnis Facts ---
  const facts = [
    ['AF-001', 'Arnis became the official national martial art and sport of the Philippines through Republic Act No. 9850, signed in 2009.', 'history', 'RA 9850', 'TRUE', ''],
    ['AF-002', 'The word "Eskrima" comes from the Spanish word "esgrima" which means fencing or swordfighting.', 'history', 'Etymology', 'TRUE', ''],
    ['AF-003', 'Filipino martial artists used Arnis to fight against Spanish colonizers, most notably during the Battle of Mactan in 1521 where Lapu-Lapu defeated Ferdinand Magellan.', 'history', 'Battle of Mactan', 'TRUE', ''],
    ['AF-004', 'The 12 striking angles in Arnis cover every possible angle of attack to the human body — from temple to knee.', 'technique', 'Fundamentals', 'TRUE', ''],
    ['AF-005', 'Sinawali, one of the most iconic Arnis drills, comes from the Filipino word "sawali" — the woven coconut palm strips used in Filipino homes.', 'culture', 'Etymology', 'TRUE', ''],
    ['AF-006', 'Modern Arnis tournaments use padded sticks (foam-covered rattan) and full protective gear, making it safer for competition.', 'tournament', 'Equipment', 'TRUE', ''],
    ['AF-007', 'Grandmaster Remy Presas founded "Modern Arnis" in 1966 and brought Filipino martial arts to international recognition.', 'history', 'GM Remy Presas', 'TRUE', ''],
  ];
  facts.forEach(f => appendToSheet(ss, 'ArnisFacts', f));

  // --- 3 Coach Availability Slots (tomorrow) ---
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().split('T')[0];

  const slots = [
    ['SLOT-001', tomorrowStr, '9:00 AM', '10:00 AM', 500, 'open', '', timestamp],
    ['SLOT-002', tomorrowStr, '2:00 PM', '3:00 PM', 500, 'open', '', timestamp],
    ['SLOT-003', tomorrowStr, '4:00 PM', '5:00 PM', 500, 'open', '', timestamp],
  ];
  slots.forEach(s => appendToSheet(ss, 'CoachAvailability', s));
}

function appendToSheet(ss, sheetName, rowData) {
  const sheet = ss.getSheetByName(sheetName);
  if (sheet) {
    sheet.appendRow(rowData);
  }
}


// =============================================================================
// END OF DMAC ACADEMY BACKEND
// Grip. Strike. Rise.
// =============================================================================
