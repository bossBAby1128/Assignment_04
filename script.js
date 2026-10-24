// console.log("Hello World");
let activeTab = "all";

const statusLabelMap = {
  notApplied: "Not Applied",
  interview: "Interview",
  rejected: "Rejected"
};

const badgeColorMap = {
  notApplied: "bg-blue-50 text-navy",
  interview: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700"
};

const badgeBaseClasses = "status-badge badge h-auto rounded-md border-0 px-3 py-2 text-sm font-medium uppercase";
const activeTabClasses = ["bg-blue-500!", "border-blue-500!", "text-white!", "font-semibold"];

// common functions for repeated codes
const getElement = (elementId) => document.getElementById(elementId);
const setText = (elementId, value) => { getElement(elementId).textContent = value; };
const getAllCards = () => document.querySelectorAll(".job-card");
const countByStatus = (status) => document.querySelectorAll(`.job-card[data-status="${status}"]`).length;
const formatJobCount = (count) => `${count} ${count === 1 ? "job" : "jobs"}`;

// one function for both Interview and Rejected buttons 
const updateJobStatus = (card, newStatus) => {
  card.dataset.status = newStatus;

  const statusBadge = card.querySelector(".status-badge");
  statusBadge.textContent = statusLabelMap[newStatus];
  statusBadge.className = `${badgeBaseClasses} ${badgeColorMap[newStatus]}`;

  card.querySelectorAll(".status-btn").forEach((statusButton) => {
    statusButton.classList.toggle("btn-active", statusButton.dataset.status === newStatus);
  });

  updateView();
};

const deleteJob = (card) => {
  card.remove();
  updateView();
};

// updates tabs,cards,counts & the empty messages
const updateView = () => {
  let visibleCount = 0;

  getAllCards().forEach((card) => {
    const isVisible = activeTab === "all" || card.dataset.status === activeTab;
    card.classList.toggle("hidden", !isVisible);
    if (isVisible) visibleCount++;
  });

  document.querySelectorAll(".tab-btn").forEach((tabButton) => {
    const isActive = tabButton.dataset.tab === activeTab;
    activeTabClasses.forEach((className) => tabButton.classList.toggle(className, isActive));
  });

  setText("total-count", getAllCards().length);
  setText("interview-count", countByStatus("interview"));
  setText("rejected-count", countByStatus("rejected"));
  setText("jobs-count", formatJobCount(visibleCount));

  getElement("empty-state").classList.toggle("hidden", visibleCount > 0);
};

//  events sections
getElement("jobs-container").addEventListener("click", (event) => {
  const card = event.target.closest(".job-card");
  if (!card) return;

  const statusButton = event.target.closest(".status-btn");
  const deleteButton = event.target.closest(".delete-btn");

  if (deleteButton) deleteJob(card);
  else if (statusButton) updateJobStatus(card, statusButton.dataset.status);
});

document.querySelectorAll(".tab-btn").forEach((tabButton) => {
  tabButton.addEventListener("click", () => {
    activeTab = tabButton.dataset.tab;
    updateView();
  });
});

updateView();