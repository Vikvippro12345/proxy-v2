let tabs = JSON.parse(localStorage.getItem("tabs") || "[]");

function openTab(urlInput) {
  const input = urlInput || document.getElementById("url-input").value;
  if (!input) return;
  const encoded = btoa(input);
  const tabId = Date.now();
  tabs.push({ id: tabId, iframeSrc: `/api/proxy?url=${encoded}`, url: input });
  saveTabs();
  renderTabs();
}

function closeTab(id) {
  tabs = tabs.filter(t => t.id !== id);
  saveTabs();
  renderTabs();
}

function saveTabs() {
  localStorage.setItem("tabs", JSON.stringify(tabs));
}

function renderTabs() {
  const container = document.getElementById("tabs");
  container.innerHTML = '';
  tabs.forEach(tab => {
    const tabWrapper = document.createElement("div");
    tabWrapper.className = "tab-wrapper";

    const closeBtn = document.createElement("button");
    closeBtn.innerText = "×";
    closeBtn.className = "tab-close";
    closeBtn.onclick = () => closeTab(tab.id);

    const iframe = document.createElement('iframe');
    iframe.src = tab.iframeSrc;
    iframe.width = '100%';
    iframe.height = '500px';
    iframe.className = "tab-iframe";

    const label = document.createElement("div");
    label.innerText = tab.url;
    label.className = "tab-label";

    tabWrapper.appendChild(closeBtn);
    tabWrapper.appendChild(label);
    tabWrapper.appendChild(iframe);
    container.appendChild(tabWrapper);
  });
}

// Dark mode toggle
function toggleDark() {
  document.body.classList.toggle("dark");
}

renderTabs();
