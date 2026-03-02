/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║         ToolMatrix — auth-setup.js  (Complete Solution)      ║
 * ║                                                              ║
 * ║  Step 1: Add Supabase SDK in your <head>:                    ║
 * ║    <script src="https://cdn.jsdelivr.net/npm/              ║
 * ║            @supabase/supabase-js@2"></script>                ║
 * ║                                                              ║
 * ║  Step 2: Add this file AFTER the SDK:                        ║
 * ║    <script src="auth-setup.js"></script>                     ║
 * ║                                                              ║
 * ║  That's it! Works automatically on every page.               ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

(function () {
    "use strict";

    /* ────────────────────────────────────────────────────────────
       1. SUPABASE CONFIG
    ──────────────────────────────────────────────────────────── */
    var SUPA_URL = "https://zykeocrfxbjicfeahzny.supabase.co";
    var SUPA_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp5a2VvY3JmeGJqaWNmZWFoem55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTkxMTQsImV4cCI6MjA4Nzk5NTExNH0.S7_Lx03URFuNm1ok-YkTe4u69WOvmczltoEQ_6zrOVw";

    /* ────────────────────────────────────────────────────────────
       2. INJECT CSS (welcome toast + user menu styles)
          Only injected once, works on every page automatically
    ──────────────────────────────────────────────────────────── */
    var AUTH_CSS = `
        /* ── WELCOME TOAST ── */
        .tm-toast {
            position: fixed;
            top: 82px;
            right: 20px;
            background: linear-gradient(135deg, #0f172a, #1e293b);
            border: 1px solid rgba(16,185,129,0.3);
            border-radius: 16px;
            padding: 14px 20px;
            display: flex;
            align-items: center;
            gap: 13px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.35);
            z-index: 9999;
            transform: translateX(120%);
            transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
            max-width: 320px;
            min-width: 240px;
        }
        .tm-toast.show { transform: translateX(0); }
        .tm-toast-icon {
            width: 42px; height: 42px;
            background: linear-gradient(135deg, #10b981, #0ea5e9);
            border-radius: 11px;
            display: flex; align-items: center; justify-content: center;
            font-size: 1.2rem; flex-shrink: 0;
        }
        .tm-toast-body {}
        .tm-toast-hi  { font-size: 0.78rem; color: #64748b; font-family: 'Inter', sans-serif; font-weight: 500; }
        .tm-toast-name{ font-size: 0.97rem; color: #fff; font-family: 'Inter', sans-serif; font-weight: 800; margin-top: 1px; }
        .tm-toast-msg { font-size: 0.76rem; color: #10b981; font-family: 'Inter', sans-serif; font-weight: 600; margin-top: 2px; }

        /* ── USER DROPDOWN MENU ── */
        .tm-user-dropdown { position: relative; display: inline-flex; }
        .tm-user-btn {
            display: flex; align-items: center; gap: 9px;
            background: rgba(16,185,129,0.08);
            border: 1.5px solid rgba(16,185,129,0.22);
            border-radius: 12px; padding: 7px 13px;
            cursor: pointer; transition: all 0.3s;
            font-family: 'Inter', sans-serif;
            color: #e2e8f0;
        }
        .tm-user-btn:hover { background: rgba(16,185,129,0.16); border-color: rgba(16,185,129,0.45); }
        .tm-user-avatar {
            width: 30px; height: 30px;
            background: linear-gradient(135deg, #10b981, #0ea5e9);
            border-radius: 50%;
            display: flex; align-items: center; justify-content: center;
            color: #fff; font-size: 0.78rem; font-weight: 800;
            flex-shrink: 0; font-family: 'Inter', sans-serif;
        }
        .tm-user-name {
            font-size: 0.86rem; font-weight: 700;
            max-width: 110px; overflow: hidden;
            text-overflow: ellipsis; white-space: nowrap;
        }
        .tm-chevron {
            font-size: 0.62rem; color: #64748b;
            transition: transform 0.3s;
            border: none; background: none;
        }
        .tm-user-dropdown.open .tm-chevron { transform: rotate(180deg); }
        .tm-dropdown-menu {
            position: absolute; top: calc(100% + 10px); right: 0;
            background: #0f172a;
            border: 1px solid rgba(16,185,129,0.2);
            border-radius: 14px; padding: 8px;
            min-width: 210px;
            box-shadow: 0 20px 50px rgba(0,0,0,0.45);
            opacity: 0; visibility: hidden;
            transition: all 0.25s ease; z-index: 3000;
            transform: translateY(-6px);
        }
        .tm-user-dropdown.open .tm-dropdown-menu {
            opacity: 1; visibility: visible; transform: translateY(0);
        }
        .tm-dd-info {
            padding: 12px 14px 10px;
            border-bottom: 1px solid rgba(148,163,184,0.12);
            margin-bottom: 6px;
        }
        .tm-dd-name  { font-size: 0.92rem; font-weight: 800; color: #fff; font-family: 'Inter', sans-serif; }
        .tm-dd-email { font-size: 0.76rem; color: #64748b; margin-top: 2px; font-family: 'Inter', sans-serif; word-break: break-all; }
        .tm-dd-item {
            display: flex; align-items: center; gap: 10px;
            padding: 9px 13px; color: #cbd5e1;
            border-radius: 8px; font-size: 0.86rem; font-weight: 600;
            cursor: pointer; transition: all 0.2s;
            text-decoration: none; border: none; background: none;
            width: 100%; font-family: 'Inter', sans-serif; text-align: left;
        }
        .tm-dd-item:hover { background: rgba(16,185,129,0.1); color: #fff; }
        .tm-dd-item.logout { color: #f87171; }
        .tm-dd-item.logout:hover { background: rgba(239,68,68,0.1); color: #fca5a5; }
        .tm-dd-divider { height: 1px; background: rgba(148,163,184,0.1); margin: 5px 0; }

        /* ── MOBILE USER CARD (inside mobile menu) ── */
        .tm-mobile-user {
            display: flex; align-items: center; gap: 12px;
            padding: 13px 16px;
            background: rgba(16,185,129,0.07);
            border-radius: 12px; margin-bottom: 8px;
            border: 1px solid rgba(16,185,129,0.15);
        }
        .tm-mob-avatar {
            width: 38px; height: 38px;
            background: linear-gradient(135deg,#10b981,#0ea5e9);
            border-radius: 50%; display: flex; align-items: center;
            justify-content: center; color: #fff; font-size: 0.85rem;
            font-weight: 800; flex-shrink: 0;
        }
        .tm-mob-info {}
        .tm-mob-name  { font-size: 0.9rem; font-weight: 700; color: #fff; font-family: 'Inter', sans-serif; }
        .tm-mob-email { font-size: 0.73rem; color: #64748b; font-family: 'Inter', sans-serif; }
        .tm-mob-logout {
            display: flex; align-items: center; gap: 9px;
            padding: 12px 18px; color: #f87171;
            font-size: 0.93rem; font-weight: 700;
            cursor: pointer; border-radius: 10px;
            border: none; background: none;
            width: 100%; font-family: 'Inter', sans-serif;
            transition: all 0.3s; text-align: left;
        }
        .tm-mob-logout:hover { background: rgba(239,68,68,0.08); color: #fca5a5; }
    `;

    if (!document.getElementById("tm-auth-css")) {
        var styleTag = document.createElement("style");
        styleTag.id = "tm-auth-css";
        styleTag.textContent = AUTH_CSS;
        document.head.appendChild(styleTag);
    }

    /* ────────────────────────────────────────────────────────────
       3. HELPERS
    ──────────────────────────────────────────────────────────── */
    function initials(name) {
        if (!name) return "U";
        return name.trim().split(/\s+/).map(function(w){ return w[0]; }).join("").toUpperCase().slice(0,2);
    }

    function el(id) { return document.getElementById(id); }

    function show(id, display) {
        var e = el(id);
        if (e) e.style.display = display || "flex";
    }
    function hide(id) {
        var e = el(id);
        if (e) e.style.display = "none";
    }
    function setText(id, txt) {
        var e = el(id);
        if (e) e.textContent = txt;
    }

    /* ────────────────────────────────────────────────────────────
       4. INJECT WELCOME TOAST (auto-creates if not present)
    ──────────────────────────────────────────────────────────── */
    function ensureToast() {
        if (el("tm-welcome-toast")) return;
        var t = document.createElement("div");
        t.className = "tm-toast";
        t.id = "tm-welcome-toast";
        t.innerHTML =
            '<div class="tm-toast-icon">👋</div>' +
            '<div class="tm-toast-body">' +
              '<div class="tm-toast-hi">Welcome back!</div>' +
              '<div class="tm-toast-name" id="tm-toast-name">User</div>' +
              '<div class="tm-toast-msg">Ready to use 100+ free tools?</div>' +
            '</div>';
        document.body.appendChild(t);
    }

    function showToast(name) {
        ensureToast();
        setText("tm-toast-name", name);
        var t = el("tm-welcome-toast");
        t.classList.add("show");
        setTimeout(function(){ t.classList.remove("show"); }, 4500);
    }

    /* ────────────────────────────────────────────────────────────
       5. BUILD USER DROPDOWN (replaces auth buttons in header)
    ──────────────────────────────────────────────────────────── */
    function buildUserDropdown(user) {
        var name  = (user.user_metadata && user.user_metadata.full_name)
                    ? user.user_metadata.full_name
                    : user.email.split("@")[0];
        var email = user.email;
        var ini   = initials(name);
        var provider = (user.app_metadata && user.app_metadata.provider) || "email";

        // Create element
        var wrap = document.createElement("div");
        wrap.className = "tm-user-dropdown";
        wrap.id = "tm-user-dropdown";
        wrap.innerHTML =
            '<button class="tm-user-btn" id="tm-user-btn">' +
              '<div class="tm-user-avatar" id="tm-hdr-avatar">' + ini + '</div>' +
              '<span class="tm-user-name" id="tm-hdr-name">' + name + '</span>' +
              '<i class="fas fa-chevron-down tm-chevron"></i>' +
            '</button>' +
            '<div class="tm-dropdown-menu" id="tm-dd-menu">' +
              '<div class="tm-dd-info">' +
                '<div class="tm-dd-name" id="tm-dd-name">' + name + '</div>' +
                '<div class="tm-dd-email" id="tm-dd-email">' + email + '</div>' +
              '</div>' +
              '<a href="index.html" class="tm-dd-item"><i class="fas fa-house"></i> Home</a>' +
              '<div class="tm-dd-divider"></div>' +
              '<button class="tm-dd-item logout" id="tm-logout-btn"><i class="fas fa-sign-out-alt"></i> Sign Out</button>' +
            '</div>';
        return wrap;
    }

    /* ────────────────────────────────────────────────────────────
       6. SHOW LOGGED IN STATE
    ──────────────────────────────────────────────────────────── */
    function showLoggedIn(user) {
        var name  = (user.user_metadata && user.user_metadata.full_name)
                    ? user.user_metadata.full_name
                    : user.email.split("@")[0];
        var email = user.email;
        var ini   = initials(name);

        // ── Existing IDs (from index.html that was provided) ──
        hide("authButtons");
        show("userMenu", "flex");
        setText("headerAvatar",    ini);
        setText("headerUserName",  name);
        setText("dropdownFullName",name);
        setText("dropdownEmail",   email);

        // Mobile
        var mobSec = el("mobileUserSection");
        if (mobSec) mobSec.classList.add("show");
        setText("mobileAvatar",    ini);
        setText("mobileUserName",  name);
        setText("mobileUserEmail", email);
        show("mobileLogoutBtn", "flex");
        hide("mobileAuth");

        // Footer
        hide("footerLoginLink");
        hide("footerSignupLink");

        // ── AUTO-INJECT if #userMenu does not exist ──
        // (For pages that don't have the full header HTML)
        if (!el("userMenu")) {
            injectMinimalUserUI(user, name, email, ini);
        }

        // Save to global
        window.TM_USER = { name: name, email: email, initials: ini, raw: user };
    }

    /* ────────────────────────────────────────────────────────────
       7. AUTO-INJECT minimal user UI if page has simple header
          (looks for any element with id="loginBtn" or class="auth-buttons")
    ──────────────────────────────────────────────────────────── */
    function injectMinimalUserUI(user, name, email, ini) {
        // Find login/signup buttons to replace
        var targets = [
            el("loginBtn"),
            el("signupBtn"),
            document.querySelector(".auth-buttons"),
            document.querySelector(".btn-login"),
        ];

        var container = null;
        for (var i = 0; i < targets.length; i++) {
            if (targets[i] && targets[i].parentElement) {
                container = targets[i].parentElement;
                break;
            }
        }
        if (!container) return;

        // Hide all auth buttons in that container
        container.querySelectorAll("a[href='login.html'], a[href='signup.html'], .btn-login, .btn-signup").forEach(function(e){
            e.style.display = "none";
        });

        // Inject dropdown if not already there
        if (!el("tm-user-dropdown")) {
            var dd = buildUserDropdown(user);
            container.appendChild(dd);
            attachDropdownEvents(window.TM_SB_CLIENT);
        }

        // Mobile: inject user info block if mobile menu exists
        injectMobileUserBlock(name, email, ini);
    }

    function injectMobileUserBlock(name, email, ini) {
        var mobileMenu = el("mobileMenu");
        if (!mobileMenu || el("tm-mobile-user-block")) return;

        var nav = mobileMenu.querySelector(".mobile-nav");
        if (!nav) return;

        // Create mobile user info block
        var block = document.createElement("div");
        block.id = "tm-mobile-user-block";
        block.innerHTML =
            '<div class="tm-mobile-user">' +
              '<div class="tm-mob-avatar">' + ini + '</div>' +
              '<div class="tm-mob-info">' +
                '<div class="tm-mob-name">' + name + '</div>' +
                '<div class="tm-mob-email">' + email + '</div>' +
              '</div>' +
            '</div>' +
            '<button class="tm-mob-logout" id="tm-mob-logout">' +
              '<i class="fas fa-sign-out-alt"></i> Sign Out' +
            '</button>';

        nav.insertBefore(block, nav.firstChild);

        // Hide mobile login/signup links
        mobileMenu.querySelectorAll("a[href='login.html'], a[href='signup.html'], .mobile-auth").forEach(function(e){
            e.style.display = "none";
        });
    }

    /* ────────────────────────────────────────────────────────────
       8. SHOW LOGGED OUT STATE
    ──────────────────────────────────────────────────────────── */
    function showLoggedOut() {
        show("authButtons", "flex");
        hide("userMenu");

        var mobSec = el("mobileUserSection");
        if (mobSec) mobSec.classList.remove("show");
        hide("mobileLogoutBtn");
        show("mobileAuth", "flex");

        // Footer
        var fll = el("footerLoginLink");
        if (fll) fll.style.display = "";
        var fsl = el("footerSignupLink");
        if (fsl) fsl.style.display = "";

        // Remove injected dropdown & mobile block
        var dd = el("tm-user-dropdown");
        if (dd) dd.remove();
        var mb = el("tm-mobile-user-block");
        if (mb) mb.remove();

        // Show back any hidden auth buttons
        document.querySelectorAll(".btn-login, .btn-signup, a[href='login.html'], a[href='signup.html']").forEach(function(e){
            if (!e.closest("#tm-user-dropdown")) e.style.display = "";
        });
        var mobileAuth = document.querySelector(".mobile-auth");
        if (mobileAuth) mobileAuth.style.display = "";

        window.TM_USER = null;
    }

    /* ────────────────────────────────────────────────────────────
       9. ATTACH DROPDOWN TOGGLE & LOGOUT EVENTS
    ──────────────────────────────────────────────────────────── */
    function attachDropdownEvents(sb) {
        // Desktop dropdown toggle
        var btn = el("tm-user-btn") || el("userDropdownBtn");
        var ddWrap = el("tm-user-dropdown") || el("userDropdown");
        if (btn && ddWrap) {
            btn.addEventListener("click", function(e){
                e.stopPropagation();
                ddWrap.classList.toggle("open");
            });
        }
        document.addEventListener("click", function(e){
            if (ddWrap && !ddWrap.contains(e.target)) {
                ddWrap.classList.remove("open");
            }
        }, true);

        // Logout buttons (multiple possible)
        ["tm-logout-btn", "logoutBtn", "mobileLogoutBtn", "tm-mob-logout"].forEach(function(id){
            var lBtn = el(id);
            if (lBtn) {
                lBtn.addEventListener("click", function(){
                    if (!sb) return;
                    sb.auth.signOut().then(function(){
                        showLoggedOut();
                        // Reload so page reflects logged-out state cleanly
                        setTimeout(function(){ window.location.reload(); }, 200);
                    });
                });
            }
        });
    }

    /* ────────────────────────────────────────────────────────────
       10. MAIN INIT — waits for Supabase SDK then runs
    ──────────────────────────────────────────────────────────── */
    function init() {
        if (!window.supabase || !window.supabase.createClient) {
            setTimeout(init, 60);
            return;
        }

        var sb = window.supabase.createClient(SUPA_URL, SUPA_KEY);
        window.TM_SB_CLIENT = sb;  // expose globally

        // ── A. Check session on page load ──
        sb.auth.getSession().then(function(result){
            var session = result.data && result.data.session;
            if (session && session.user) {
                showLoggedIn(session.user);

                // Show welcome toast only right after login/signup
                if (sessionStorage.getItem("tm_just_logged_in")) {
                    var n = (session.user.user_metadata && session.user.user_metadata.full_name)
                            ? session.user.user_metadata.full_name
                            : session.user.email.split("@")[0];
                    showToast(n);
                    sessionStorage.removeItem("tm_just_logged_in");
                }
            } else {
                showLoggedOut();
            }

            // Attach events after state is known
            attachDropdownEvents(sb);
        });

        // ── B. Listen for auth changes (Google OAuth redirect, other tab, etc.) ──
        sb.auth.onAuthStateChange(function(event, session){
            if (event === "SIGNED_IN" && session && session.user) {
                showLoggedIn(session.user);
                attachDropdownEvents(sb);

                if (sessionStorage.getItem("tm_just_logged_in")) {
                    var n = (session.user.user_metadata && session.user.user_metadata.full_name)
                            ? session.user.user_metadata.full_name
                            : session.user.email.split("@")[0];
                    showToast(n);
                    sessionStorage.removeItem("tm_just_logged_in");
                }
            } else if (event === "SIGNED_OUT") {
                showLoggedOut();
            }
        });
    }

    // Run on DOMContentLoaded
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

})();
