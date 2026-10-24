// console.log("Hello World");
const jobList = [
  { id: 1, companyName: "Mobile First Corp", position: "React Native Developer", location: "Remote", type: "Full-time", salary: "$130,000 - $175,000", description: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "notApplied" },
  { id: 2, companyName: "WebFlow Agency", position: "Web Designer & Developer", location: "Los Angeles, CA", type: "Part-time", salary: "$80,000 - $120,000", description: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "notApplied" },
  { id: 3, companyName: "DataViz Solutions", position: "Data Visualization Specialist", location: "Boston, MA", type: "Full-time", salary: "$125,000 - $165,000", description: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.", status: "notApplied" },
  { id: 4, companyName: "CloudFirst Inc", position: "Backend Developer", location: "Seattle, WA", type: "Full-time", salary: "$140,000 - $190,000", description: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.", status: "notApplied" },
  { id: 5, companyName: "Innovation Labs", position: "UI/UX Engineer", location: "Austin, TX", type: "Full-time", salary: "$110,000 - $150,000", description: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.", status: "notApplied" },
  { id: 6, companyName: "MegaCorp Solutions", position: "JavaScript Developer", location: "New York, NY", type: "Full-time", salary: "$130,000 - $170,000", description: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.", status: "notApplied" },
  { id: 7, companyName: "StartupXYZ", position: "Full Stack Engineer", location: "Remote", type: "Full-time", salary: "$120,000 - $160,000", description: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.", status: "notApplied" },
  { id: 8, companyName: "TechCorp Industries", position: "Senior Frontend Developer", location: "San Francisco, CA", type: "Full-time", salary: "$130,000 - $175,000", description: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.", status: "notApplied" }
];

const statusLabelMap = { notApplied: "Not Applied", interview: "Interview", rejected: "Rejected" };

const badgeClassMap = {
  notApplied: "bg-blue-50 text-navy",
  interview: "bg-emerald-100 text-emerald-700",
  rejected: "bg-red-100 text-red-700"
};

const buttonClassMap = {
  interview: "btn-success",
  rejected: "btn-error"
};

const activeTabClasses = ["!bg-blue-500", "!border-blue-500", "!text-white", "font-semibold"];

const trashIcon = `<i class="fa-solid fa-trash"></i>`;

let activeTab = "all";

//  common function for repeated codes
const getElement = (elementId) => document.getElementById(elementId);
const setText = (elementId, value) => { getElement(elementId).textContent = value; };
const getJobsByStatus = (status) => jobList.filter((job) => job.status === status);
const getVisibleJobs = () => (activeTab === "all" ? jobList : getJobsByStatus(activeTab));
const formatJobCount = (count) => `${count} ${count === 1 ? "job" : "jobs"}`;

// common function for both Interview and Rejected buttons
const updateJobStatus = (jobId, newStatus) => {
  const selectedJob = jobList.find((job) => job.id === jobId);
  selectedJob.status = newStatus;
  renderAll();
};

const deleteJob = (jobId) => {
  const jobIndex = jobList.findIndex((job) => job.id === jobId);
  jobList.splice(jobIndex, 1);
  renderAll();
};

// common function for action buttons
const createStatusButton = (job, status) => {
  const activeClass = job.status === status ? "btn-active" : "";
  return `<button class="btn btn-sm btn-outline ${buttonClassMap[status]} ${activeClass} uppercase"
            data-action="status" data-id="${job.id}" data-status="${status}">${statusLabelMap[status]}</button>`;
};

const createJobCard = (job) => `
  <article class="card relative border border-slate-200 bg-white p-6">
    <button class="btn btn-circle btn-ghost btn-sm absolute right-5 top-5 border border-slate-200 text-slate-500 hover:text-red-500"
      data-action="delete" data-id="${job.id}" aria-label="Delete ${job.companyName}">${trashIcon}</button>
    <h3 class="text-lg font-semibold text-navy">${job.companyName}</h3>
    <p class="text-slate-500">${job.position}</p>
    <p class="my-4 text-sm text-slate-500">${job.location} &nbsp;•&nbsp; ${job.type} &nbsp;•&nbsp; ${job.salary}</p>
    <div>
      <span class="badge h-auto rounded-md border-0 px-3 py-2 text-sm font-medium uppercase ${badgeClassMap[job.status]}">${statusLabelMap[job.status]}</span>
    </div>
    <p class="my-3 text-sm">${job.description}</p>
    <div class="flex flex-wrap gap-2">
      ${createStatusButton(job, "interview")}
      ${createStatusButton(job, "rejected")}
    </div>
  </article>`;

// rendering section
const renderDashboard = () => {
  setText("total-count", jobList.length);
  setText("interview-count", getJobsByStatus("interview").length);
  setText("rejected-count", getJobsByStatus("rejected").length);
};

const renderJobs = () => {
  const visibleJobs = getVisibleJobs();
  setText("jobs-count", formatJobCount(visibleJobs.length));

  document.querySelectorAll(".tab-btn").forEach((tabButton) => {
    const isActive = tabButton.dataset.tab === activeTab;
    activeTabClasses.forEach((className) => tabButton.classList.toggle(className, isActive));
  });

  getElement("empty-state").classList.toggle("hidden", visibleJobs.length > 0);
  getElement("jobs-container").innerHTML = visibleJobs.map(createJobCard).join("");
};

const renderAll = () => {
  renderDashboard();
  renderJobs();
};

// events section
getElement("jobs-container").addEventListener("click", (event) => {
  const clickedButton = event.target.closest("button[data-action]");
  if (!clickedButton) return;

  const jobId = Number(clickedButton.dataset.id);
  if (clickedButton.dataset.action === "delete") deleteJob(jobId);
  else updateJobStatus(jobId, clickedButton.dataset.status);
});

document.querySelectorAll(".tab-btn").forEach((tabButton) => {
  tabButton.addEventListener("click", () => {
    activeTab = tabButton.dataset.tab;
    renderAll();
  });
});

renderAll();