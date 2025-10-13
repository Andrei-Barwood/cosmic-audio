// ============ FIREBASE FEED - ANONYMOUS OR AUTH =============

// --- USER/SESSION HANDLING ---
let currentUser = null;
let anonymousUsername = null;

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        currentUser = user;
        anonymousUsername = null;
        showUserMenu(user);
    } else {
        currentUser = null;
        anonymousUsername = localStorage.getItem('anonymousUsername');
        if (!anonymousUsername) { promptForUsername(); }
        hideUserMenu();
    }
    loadPosts();
    updateComposerStatus(!!user);
});

// Prompt for anonymous username (first time only)
function promptForUsername() {
    const username = prompt(
        'Choose a username for this session:\n(Your posts will be anonymous unless you create an account)',
        'Anonymous');
    if (username && username.trim()) {
        anonymousUsername = username.trim();
        localStorage.setItem('anonymousUsername', anonymousUsername);
    } else {
        anonymousUsername = 'Anonymous';
        localStorage.setItem('anonymousUsername', 'Anonymous');
    }
    updateComposerStatus(false);
}

// --- USER MENU & COMPOSER UI ---
function showUserMenu(user) {
    const userMenu = document.getElementById('userMenu');
    const userName = document.getElementById('userName');
    const userAvatar = document.getElementById('userAvatar');
    if (userMenu && userName && userAvatar) {
        userMenu.style.display = 'flex';
        userName.textContent = user.displayName || user.email.split('@')[0];
        userAvatar.src = user.photoURL || 'dj-photo.jpg';
    }
    updateComposerStatus(true);
}

function hideUserMenu() {
    const userMenu = document.getElementById('userMenu');
    if (userMenu) {
        userMenu.style.display = 'none';
    }
    updateComposerStatus(false);
}

// Update composer (UI banner for session)
function updateComposerStatus(isAuthenticated) {
    const composer = document.querySelector('.post-composer');
    if (!composer) return;
    const old = composer.querySelector('.composer-status');
    if (old) old.remove();
    const status = document.createElement('div');
    status.className = 'composer-status';
    if (isAuthenticated) {
        status.innerHTML = `
            <span class="status-badge verified">✓ Posting as ${currentUser.displayName || currentUser.email.split('@')[0]}</span>
            <button class="btn-small" id="logoutBtn2">Logout</button>
        `;
    } else {
        status.innerHTML = `
            <span class="status-badge anonymous">👤 Posting as ${anonymousUsername}</span>
            <button class="btn-small" id="changeUsernameBtn">Change Name</button>
            <button class="btn-small" id="createAccountBtn">Create Account (Get Notified)</button>
        `;
    }
    composer.insertBefore(status, composer.firstChild);

    document.getElementById('logoutBtn2')?.addEventListener('click', () => firebase.auth().signOut());
    document.getElementById('changeUsernameBtn')?.addEventListener('click', () => {
        localStorage.removeItem('anonymousUsername');
        promptForUsername();
    });
    document.getElementById('createAccountBtn')?.addEventListener('click', () => {
        document.getElementById('authModal').classList.add('active');
    });
}

// CHARACTER COUNTER & BUTTON STATE
document.addEventListener('DOMContentLoaded', function() {
    const postInput = document.getElementById('postInput');
    const postBtn = document.getElementById('postBtn');
    const charCount = document.getElementById('charCount');
    if (postInput && charCount) {
        postInput.addEventListener('input', function() {
            const count = this.value.length;
            const max = 500;
            charCount.textContent = `${count}/${max}`;
            charCount.classList.remove('warning', 'error');
            if (count > 450) { charCount.classList.add('warning'); }
            if (count >= max) { charCount.classList.add('error'); }
            postBtn.disabled = count === 0 || count > max;
        });
        postInput.addEventListener('keydown', function(e) {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                postBtn.click();
            }
        });
    }
});

// POST HANDLER - USE FIRESTORE ONLY!
document.addEventListener('click', function(e) {
    if (e.target.id === 'postBtn' || e.target.closest('#postBtn')) {
        handlePostCreation();
    }
});

async function handlePostCreation() {
    const postInput = document.getElementById('postInput');
    const content = postInput.value.trim();
    if (!content) return;
    const tags = content.match(/#\w+/g) || [];
    const isAnonymous = !currentUser;
    const posterUsername = isAnonymous ? anonymousUsername : (currentUser.displayName || currentUser.email.split('@')[0]);
    const posterId = isAnonymous ? null : currentUser.uid;
    try {
        const postData = {
            userId: posterId,
            username: posterUsername,
            userAvatar: isAnonymous ? 'dj-photo.jpg' : (currentUser.photoURL || 'dj-photo.jpg'),
            content: content,
            tags: tags,
            category: 'thoughts',
            likes: 0,
            replies: 0,
            shares: 0,
            likedBy: [],
            isAnonymous: isAnonymous,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        };
        await db.collection('posts').add(postData);
        postInput.value = '';
        const charCount = document.getElementById('charCount');
        if (charCount) charCount.textContent = '0/500';
        showSuccessMessage('✅ Posted to the community!');
    } catch (error) {
        alert('[FIREBASE ERROR] ' + error.message);
        console.error('[FIREBASE ERROR]', error);
    }
}

// SUCCESS MESSAGE
function showSuccessMessage(message) {
    const existing = document.querySelector('.success-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'success-toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// --- LOAD & DISPLAY POSTS ---
function loadPosts() {
    const postsFeed = document.getElementById('postsFeed');
    if (!postsFeed) return;
    db.collection('posts')
        .orderBy('createdAt', 'desc')
        .limit(50)
        .onSnapshot((snapshot) => {
            postsFeed.innerHTML = '';
            if (snapshot.empty) {
                postsFeed.innerHTML = '<p style="text-align:center;color:#999;padding:3rem;">No posts yet. Be the first to post!</p>';
                return;
            }
            snapshot.forEach((doc) => {
                const post = doc.data();
                const postId = doc.id;
                if (!post.createdAt) return;
                createPostElement(post, postId);
            });
        }, (error) => {
            console.error('❌ Error loading posts:', error);
            postsFeed.innerHTML = '<p style="text-align:center; color:#ff0055; padding:3rem;">Error loading posts. Check console.</p>';
        });
}

function createPostElement(post, postId) {
    const postsFeed = document.getElementById('postsFeed');
    const article = document.createElement('article');
    article.className = 'feed-post';
    article.setAttribute('data-category', post.category || 'thoughts');
    article.setAttribute('data-post-id', postId);
    const timeAgo = getTimeAgo(post.createdAt);
    const contentWithoutTags = post.content.replace(/#\w+/g, '').trim();
    const userId = currentUser ? currentUser.uid : `anon_${anonymousUsername}`;
    const localLikes = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    const isLiked = currentUser ? (post.likedBy && post.likedBy.includes(currentUser.uid)) : localLikes.includes(postId);
    const anonymousBadge = post.isAnonymous ? '<span class="anonymous-badge" title="Anonymous post">👤</span>' : '';
    article.innerHTML = `
        <div class="post-avatar">
            <img src="${post.userAvatar || 'dj-photo.jpg'}" alt="${post.username}">
        </div>
        <div class="post-content">
            <div class="post-header">
                <div class="post-author">
                    <span class="author-name">${post.username}</span>
                    ${anonymousBadge}
                    <span class="author-handle">@${post.username.toLowerCase().replace(/\s/g, '')}</span>
                    <span class="post-badge">${post.category || 'Thoughts'}</span>
                </div>
                <span class="post-time">${timeAgo}</span>
            </div>
            <div class="post-body">
                <p>${contentWithoutTags}</p>
                ${post.tags && post.tags.length > 0 ? `
                    <div class="post-tags">
                        ${post.tags.map(tag => `<span class="post-tag">${tag}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
            <div class="post-footer">
                <button class="post-action like-btn ${isLiked ? 'active' : ''}" data-post-id="${postId}">
                    <span class="action-icon">♥</span>
                    <span class="action-count">${post.likes || 0}</span>
                </button>
                <button class="post-action reply-btn">
                    <span class="action-icon">💬</span>
                    <span class="action-count">${post.replies || 0}</span>
                </button>
                <button class="post-action share-btn">
                    <span class="action-icon">↗</span>
                    <span class="action-count">${post.shares || 0}</span>
                </button>
            </div>
        </div>
    `;
    postsFeed.appendChild(article);
    attachPostListeners(article, postId);
}

// --- INTERACTORS ---

async function likePost(postId, likeBtn) {
    const postRef = db.collection('posts').doc(postId);
    const isLiked = likeBtn.classList.contains('active');
    const localLikes = JSON.parse(localStorage.getItem('likedPosts') || '[]');
    try {
        if (currentUser) {
            if (isLiked) {
                await postRef.update({
                    likes: firebase.firestore.FieldValue.increment(-1),
                    likedBy: firebase.firestore.FieldValue.arrayRemove(currentUser.uid)
                });
            } else {
                await postRef.update({
                    likes: firebase.firestore.FieldValue.increment(1),
                    likedBy: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                });
            }
        } else {
            // Anonymous
            if (isLiked) {
                await postRef.update({ likes: firebase.firestore.FieldValue.increment(-1) });
                const index = localLikes.indexOf(postId);
                if (index > -1) localLikes.splice(index, 1);
            } else {
                await postRef.update({ likes: firebase.firestore.FieldValue.increment(1) });
                localLikes.push(postId);
            }
            localStorage.setItem('likedPosts', JSON.stringify(localLikes));
        }
        likeBtn.classList.toggle('active');
        const countSpan = likeBtn.querySelector('.action-count');
        const currentCount = parseInt(countSpan.textContent);
        countSpan.textContent = isLiked ? currentCount - 1 : currentCount + 1;
    } catch (error) {
        console.error('Error liking post:', error);
    }
}

async function sharePost(postId, shareBtn) {
    const postRef = db.collection('posts').doc(postId);
    try {
        await postRef.update({ shares: firebase.firestore.FieldValue.increment(1) });
        const postElement = document.querySelector(`[data-post-id="${postId}"]`);
        const content = postElement.querySelector('.post-body p').textContent;
        await navigator.clipboard.writeText(`"${content}" - Underground Community Feed\n${window.location.href}`);
        showSuccessMessage('✅ Post copied to clipboard!');
        const countSpan = shareBtn.querySelector('.action-count');
        countSpan.textContent = parseInt(countSpan.textContent) + 1;
    } catch (error) {
        console.error('Error sharing post:', error);
    }
}

function attachPostListeners(postElement, postId) {
    const likeBtn = postElement.querySelector('.like-btn');
    const shareBtn = postElement.querySelector('.share-btn');
    likeBtn.addEventListener('click', () => likePost(postId, likeBtn));
    shareBtn.addEventListener('click', () => sharePost(postId, shareBtn));
}

// FILTERS and other UI enhancements can be added here...

function getTimeAgo(timestamp) {
    if (!timestamp) return 'Just now';
    const now = Date.now();
    const postTime = timestamp.toDate().getTime();
    const diff = Math.floor((now - postTime) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return timestamp.toDate().toLocaleDateString();
}

// AUTH MODAL CONTROLS (simple example)
document.getElementById('closeAuthModal')?.addEventListener('click', () => {
    document.getElementById('authModal').classList.remove('active');
});
document.getElementById('showRegister')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
});
document.getElementById('showLogin')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
});
document.getElementById('logoutBtn')?.addEventListener('click', async () => {
    if (confirm('Logout? You can still post anonymously.')) {
        await firebase.auth().signOut();
    }
});
