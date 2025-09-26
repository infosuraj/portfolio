import React, { useState, useEffect, useCallback, useRef } from "react"; // Import useRef
import "./admin.css";
import LoginPage from "./components/adminLogin";
import { ProjectsTab, ProjectForm } from "./components/adminProject";
import { AdminProfile } from "./components/adminProfile";
import { SkillTab, SkillForm } from "./components/adminSkills";
import { AwardsTab, AwardForm } from "./components/adminAwards";
import { BlogsTab, BlogForm } from "./components/adminBlogs";
import { ClientForm, ClientsTab } from "./components/adminClients";
import { ExperienceForm, ExperienceTab } from "./components/adminExperience";
import { AffiliateForm, AffiliatesTab } from "./components/adminAffiliates";
import {
  TestimonialForm,
  TestimonialsTab,
} from "./components/adminTestimonials";

import {
  handleFileUpload,
  loginRequest,
  fetchData,
  saveData,
  deleteData,
} from "./utils/adminUtility";
import { Helmet } from "react-helmet";

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem("adminToken") || "");
  const [view, setView] = useState("profile");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [awards, setAwards] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [clients, setClients] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  const [editingProject, setEditingProject] = useState(null);
  const [editingSkill, setEditingSkill] = useState(null);
  const [editingAward, setEditingAward] = useState(null);
  const [editingBlog, setEditingBlog] = useState(null);
  const [editingexperience, setEditingexperience] = useState(null);
  const [editingaffiliate, setEditingaffiliate] = useState(null);
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const [profile, setProfile] = useState(null);

  const handleLogout = useCallback(async () => {
    const BASE_URL = process.env.REACT_APP_API_BASE_URL;
    try {
      await fetch(`${BASE_URL}/admin/logout`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error calling logout API:", error);
    } finally {
      setToken("");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminLoginTime");
      localStorage.setItem("adminToken", "");
      setView("login");
      setMessage("You have been logged out.");
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    }
  }, [token]); // Add any other state/props if used inside the function

  // Inactivity timer setup
  const inactivityTimeoutRef = useRef(null);
  const INACTIVITY_LIMIT_MS = 30 * 60 * 1000; // 30 minutes

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    if (token) {
      inactivityTimeoutRef.current = setTimeout(() => {
        setMessage("You have been logged out due to inactivity.");
        handleLogout();
      }, INACTIVITY_LIMIT_MS);
    }
  }, [token, INACTIVITY_LIMIT_MS, handleLogout]); // Include token in dependencies to re-create timer on login/logout

  // Event listeners for user activity
  useEffect(() => {
    const activityEvents = [
      "mousemove",
      "keydown",
      "mousedown",
      "scroll",
      "touchstart",
    ];

    const handleActivity = () => {
      resetInactivityTimer();
    };

    if (token) {
      activityEvents.forEach((event) =>
        window.addEventListener(event, handleActivity)
      );
      resetInactivityTimer(); // Initialize timer on component mount if logged in
    }

    return () => {
      // Cleanup: remove event listeners and clear timeout
      activityEvents.forEach((event) =>
        window.removeEventListener(event, handleActivity)
      );
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [token, resetInactivityTimer]);

  // Session storage listener for cross-tab logout
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Listen for 'adminToken' changes initiated by other tabs
      if (e.key === "adminToken" && e.newValue === "") {
        setToken(""); // Clear token in this tab as well
        setMessage("You have been logged out from another session.");
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Memoized function to fetch projects
  const getProjects = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchData("projects", token);
      setProjects(data);
    } catch (error) {
      setMessage(error.message);
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Memoized function to fetch skills
  const getSkills = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchData("skills", token);
      setSkills(data);
    } catch (error) {
      setMessage(error.message);
      setSkills([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Memoized function to fetch awards
  const getAwards = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchData("awards", token);
      setAwards(data);
    } catch (error) {
      setMessage(error.message);
      setAwards([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Memoized function to fetch blogs
  const getBlogs = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchData("blogs", token);
      setBlogs(data);
    } catch (error) {
      setMessage(error.message);
      setBlogs([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  const getTestimonials = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchData("testimonials", token);
      setTestimonials(data);
    } catch (error) {
      setMessage(error.message);
      setTestimonials([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Memoized function to fetch clients
  const getClients = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchData("clients", token);
      setClients(data);
    } catch (error) {
      setMessage(error.message);
      setClients([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Memoized function to fetch experiences
  const getExperiences = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchData("experiences", token);
      setExperiences(data);
    } catch (error) {
      setMessage(error.message);
      setExperiences([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Memoized function to fetch affiliates
  const getAffiliates = useCallback(async () => {
    if (!token) return;
    setIsLoading(true);
    try {
      const data = await fetchData("affiliates", token);
      setAffiliates(data);
    } catch (error) {
      setMessage(error.message);
      setAffiliates([]);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Memoized function to fetch profile
  const getProfile = useCallback(async () => {
    if (!token) return;
    try {
      const data = await fetchData("profile", token);
      setProfile(Array.isArray(data) && data.length > 0 ? data[0] : {});
    } catch (error) {
      console.error("Error fetching profile:", error);
      setProfile({});
      setMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  // Effect hook to load data on token change
  useEffect(() => {
    if (token) {
      getProfile();
      getProjects();
      getSkills();
      getAwards();
      getBlogs();
      getClients();
      getExperiences();
      getAffiliates();
      getTestimonials();
    } else {
      setView("login");
      setIsLoading(false);
    }
  }, [
    token,
    getProjects,
    getProfile,
    getSkills,
    getAwards,
    getBlogs,
    getClients,
    getExperiences,
    getAffiliates,
    getTestimonials,
  ]);

  // Handler for user login
  const handleLogin = async (username, password) => {
    try {
      const data = await loginRequest(username, password);
      setToken(data.token);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminLoginTime", Date.now().toString()); // Store login time
      setView("profile");
      setMessage("Login successful!");
      resetInactivityTimer(); // Start timer on successful login
    } catch (error) {
      setMessage(`Login failed: ${error.message}`);
    }
  };

  // Handler for user logout

  // --- Handlers for saving data for different sections ---

  const handleSaveProject = async (data, id) => {
    try {
      await saveData("projects", data, token, id);
      setMessage(`Project saved successfully!`);
      getProjects();
      return true;
    } catch (error) {
      setMessage(`Error saving project: ${error.message}`);
      return false;
    }
  };

  // UPDATED: handleSaveSkill - now handles both initial POST and subsequent PUTs
  const handleSaveSkill = async (formData) => {
    try {
      setMessage("");
      const existingSkillDocId = skills.length > 0 ? skills[0]._id : null;

      if (existingSkillDocId) {
        // If document exists, UPDATE it using PUT
        await saveData("skills", formData, token, existingSkillDocId);
        setMessage("Skills data updated successfully!");
      } else {
        // If no document exists, CREATE a new one using POST
        await saveData("skills", formData, token);
        setMessage("New skills document created successfully!");
      }

      await getSkills(); // Re-fetch skills to get the latest state and new IDs if created
      setView("skills"); // Navigate back to the main skills tab
      setEditingSkill(null); // Clear editing state
      return true;
    } catch (error) {
      setMessage(`Error saving skill: ${error.message}`);
      console.error("Save Skill Error:", error);
      return false;
    }
  };

  const handleSaveAward = async (data, id) => {
    try {
      await saveData("awards", data, token, id);
      setMessage(`Award saved successfully!`);
      getAwards();
      return true;
    } catch (error) {
      setMessage(`Error saving award: ${error.message}`);
      return false;
    }
  };

  const handleSaveBlog = async (data, id) => {
    try {
      await saveData("blogs", data, token, id);
      setMessage(`Blog saved successfully!`);
      getBlogs();
      return true;
    } catch (error) {
      setMessage(`Error saving blog: ${error.message}`);
      return false;
    }
  };

  const handleSaveTestimonial = async (data, id) => {
    try {
      await saveData("testimonials", data, token, id);
      setMessage(`Testimonial saved successfully!`);
      getTestimonials();
      return true;
    } catch (error) {
      setMessage(`Error saving Testimonial: ${error.message}`);
      return false;
    }
  };

  const handleSaveAffiliate = async (data, id) => {
    try {
      await saveData("affiliates", data, token, id);
      setMessage(`Affiliate saved successfully!`);
      getAffiliates();
      return true;
    } catch (error) {
      setMessage(`Error saving Affiliate: ${error.message}`);
      return false;
    }
  };

  const handleSaveClient = async (data, id) => {
    try {
      await saveData("clients", data, token, id);
      setMessage(`Client saved successfully!`);
      getClients();
      return true;
    } catch (error) {
      setMessage(`Error saving client: ${error.message}`);
      return false;
    }
  };

  const handleSaveExperience = async (data, id) => {
    try {
      await saveData("experiences", data, token, id);
      setMessage(`Experience saved successfully!`);
      getExperiences();
      return true;
    } catch (error) {
      setMessage(`Error saving Experience: ${error.message}`);
      return false;
    }
  };

  const handleSaveProfile = async (data) => {
    try {
      await saveData("profile", data, token, profile?._id);
      setMessage("Profile saved successfully!");
      getProfile();
      return true;
    } catch (error) {
      setMessage(`Error saving profile: ${error.message}`);
      console.error("Error in handleSaveProfile:", error);
      return false;
    }
  };

  // --- Handlers for deleting data for different sections ---

  const handleDeleteProject = async (id) => {
    try {
      await deleteData("projects", id, token);
      setMessage(`Project deleted successfully.`);
      getProjects();
    } catch (error) {
      if (error.message !== "Delete cancelled by user.") {
        setMessage(`Error deleting project: ${error.message}`);
      }
    }
  };

  // UPDATED: handleDeleteSkill - remains granular for specific deletes
  const handleDeleteSkill = async (skillDocId, type, nestedIds = {}) => {
    try {
      setMessage("");
      let endpoint;
      let messageText;

      if (type === "document") {
        endpoint = `skills/${skillDocId}`;
        messageText = "Skills document deleted successfully.";
      } else if (type === "item") {
        endpoint = `skills/${skillDocId}/items/${nestedIds}`; // nestedIds is item._id
        messageText = "Skill item removed successfully.";
      } else if (type === "category") {
        endpoint = `skills/${skillDocId}/skillsProgress/${nestedIds}`; // nestedIds is category._id
        messageText = "Skill category removed successfully.";
      } else if (type === "nestedSkill") {
        const { categoryId, skillId } = nestedIds;
        endpoint = `skills/${skillDocId}/skillsProgress/${categoryId}/skills/${skillId}`;
        messageText = "Individual skill removed successfully.";
      } else {
        throw new Error("Invalid deletion type.");
      }

      await deleteData(endpoint, "", token); // Pass empty string for ID if it's part of the URL path
      setMessage(messageText);
      await getSkills();
    } catch (error) {
      setMessage(`Error deleting skill entry: ${error.message}`);
      console.error("Delete Skill Error:", error);
    }
  };

  const handleDeleteAward = async (id) => {
    try {
      await deleteData("awards", id, token);
      setMessage(`Award deleted successfully.`);
      getAwards();
    } catch (error) {
      setMessage(`Error deleting award: ${error.message}`);
    }
  };

  const handleDeleteBlog = async (id) => {
    try {
      await deleteData("blogs", id, token);
      setMessage(`Blog deleted successfully.`);
      getBlogs();
    } catch (error) {
      setMessage(`Error deleting blog: ${error.message}`);
    }
  };

  const handleDeleteTestimonial = async (id) => {
    try {
      await deleteData("testimonials", id, token);
      setMessage(`Testimonial deleted successfully.`);
      getTestimonials();
    } catch (error) {
      setMessage(`Error deleting Testimonial: ${error.message}`);
    }
  };

  const handleDeleteAffiliate = async (id) => {
    try {
      await deleteData("affiliates", id, token);
      setMessage(`Affiliate deleted successfully.`);
      getAffiliates();
    } catch (error) {
      setMessage(`Error deleting affiliate: ${error.message}`);
    }
  };

  const handleDeleteClients = async (id) => {
    try {
      await deleteData("clients", id, token);
      setMessage(`Client deleted successfully.`);
      getClients();
    } catch (error) {
      setMessage(`Error deleting client: ${error.message}`);
    }
  };

  const handleDeleteExperience = async (id) => {
    try {
      await deleteData("experiences", id, token);
      setMessage(`Experience deleted successfully.`);
      getExperiences();
    } catch (error) {
      setMessage(`Error deleting Experience: ${error.message}`);
    }
  };

  const handleImageUpload = async (file, folder) => {
    try {
      const {url, thumbnail} = await handleFileUpload(file, folder);
      setMessage("File uploaded successfully!");
      return { url, thumbnail };
    } catch (error) {
      setMessage(`Upload Error: ${error.message}`);
      return null;
    }
  };

  // Render login page if no token
  if (view === "login") {
    return <LoginPage onLogin={handleLogin} message={message} />;
  }

  // Function to render the current view based on 'view' state
  const renderView = () => {
    if (isLoading) return <div className="admin_card">Loading...</div>;

    switch (view) {
      case "addProject":
      case "editProject":
        return (
          <ProjectForm
            project={editingProject}
            onSave={handleSaveProject}
            onCancel={() => setView("projects")}
            onImageUpload={handleImageUpload}
          />
        );
      case "addSkill":
      case "editSkill":
        // SkillForm's onSave prop now takes the entire formData.
        // It will POST if adding new doc, PUT if editing existing.
        // onSaveNested prop is removed from SkillForm props as it's not used.
        return (
          <SkillForm
            skill={editingSkill} // Will be null for 'addSkill', or the full doc for 'editSkill'
            onSave={handleSaveSkill} // This is the single save handler for the entire document
            onCancel={() => {
              setView("skills");
              setEditingSkill(null);
            }}
            onImageUpload={handleImageUpload}
          />
        );
      case "addAward":
      case "editAward":
        return (
          <AwardForm
            award={editingAward}
            onSave={handleSaveAward}
            onCancel={() => setView("awards")}
            onImageUpload={handleImageUpload}
          />
        );
      case "addBlog":
      case "editBlog":
        return (
          <BlogForm
            blog={editingBlog}
            onSave={handleSaveBlog}
            onCancel={() => setView("blogs")}
            onImageUpload={handleImageUpload}
          />
        );

      case "addAffiliate":
      case "editAffiliate":
        return (
          <AffiliateForm
            affiliate={editingaffiliate}
            onSave={handleSaveAffiliate}
            onCancel={() => setView("affiliates")}
            onImageUpload={handleImageUpload}
          />
        );

      case "addTestimonial":
      case "editTestimonial":
        return (
          <TestimonialForm
            testimonial={editingTestimonial}
            onSave={handleSaveTestimonial}
            onCancel={() => setView("testimonials")}
            onImageUpload={handleImageUpload}
          />
        );

      case "addExperience":
      case "editExperience":
        return (
          <ExperienceForm
            experience={editingexperience}
            onSave={handleSaveExperience}
            onCancel={() => setView("experiences")}
            onImageUpload={handleImageUpload}
          />
        );
      case "addClient":
        return (
          <ClientForm
            client={null}
            onSave={handleSaveClient}
            onCancel={() => setView("clients")}
            onImageUpload={handleImageUpload}
          />
        );
      case "profile":
        return profile ? (
          <AdminProfile
            profile={profile}
            onSave={handleSaveProfile}
            onCancel={() => setView("profile")}
            onImageUpload={handleImageUpload}
          />
        ) : (
          <div className="admin_card">Loading profile...</div>
        );
      case "skills":
        return (
          <SkillTab
            skills={skills}
            onEdit={(skillDocId, type, data) => {
              const fullSkillDoc = skills.find((s) => s._id === skillDocId);
              setEditingSkill(fullSkillDoc || null);
              setView("editSkill");
            }}
            onDelete={handleDeleteSkill}
            onAddNew={() => {
              if (skills.length === 0) {
                setEditingSkill(null);
                setView("addSkill");
              } else {
                setMessage(
                  "A Skills document already exists. Please use 'Edit' to add/modify skills."
                );
              }
            }}
          />
        );
      case "awards":
        return (
          <AwardsTab
            awards={awards}
            onEdit={(a) => {
              setEditingAward(a);
              setView("editAward");
            }}
            onDelete={handleDeleteAward}
            onAddNew={() => {
              setEditingAward(null);
              setView("addAward");
            }}
          />
        );
      case "blogs":
        return (
          <BlogsTab
            blogs={blogs}
            onEdit={(b) => {
              setEditingBlog(b);
              setView("editBlog");
            }}
            onDelete={handleDeleteBlog}
            onAddNew={() => {
              setEditingBlog(null);
              setView("addBlog");
            }}
          />
        );
      case "affiliates":
        return (
          <AffiliatesTab
            affiliates={affiliates}
            onEdit={(a) => {
              setEditingaffiliate(a);
              setView("editAffiliate");
            }}
            onDelete={handleDeleteAffiliate}
            onAddNew={() => {
              setEditingaffiliate(null);
              setView("addAffiliate");
            }}
          />
        );

      case "testimonials":
        return (
          <TestimonialsTab
            testimonials={testimonials}
            onEdit={(t) => {
              setEditingTestimonial(t);
              setView("editTestimonial");
            }}
            onDelete={handleDeleteTestimonial}
            onAddNew={() => {
              setEditingTestimonial(null);
              setView("addTestimonial");
            }}
          />
        );

      case "experiences":
        return (
          <ExperienceTab
            experiences={experiences}
            onEdit={(e) => {
              setEditingexperience(e);
              setView("editExperience");
            }}
            onDelete={handleDeleteExperience}
            onAddNew={() => {
              setEditingexperience(null);
              setView("addExperience");
            }}
          />
        );
      case "clients":
        return (
          <ClientsTab
            clients={clients}
            onDelete={handleDeleteClients}
            onAddNew={() => {
              setView("addClient");
            }}
          />
        );
      case "projects":
      default:
        return (
          <ProjectsTab
            projects={projects}
            onEdit={(p) => {
              setEditingProject(p);
              setView("editProject");
            }}
            onDelete={handleDeleteProject}
            onAddNew={() => {
              setEditingProject(null);
              setView("addProject");
            }}
          />
        );
    }
  };

  return (
    <>
    <Helmet>
      <title>INFOSURAJ Admin Panel</title>
      <meta name="robots" content="noindex, nofollow" />
      <meta
        name="description"
        content="Admin dashboard for INFOSURAJ website management."
      />
    </Helmet>
    <div className="admin_container">
      <header className="admin_header">
        <div className="admin_header-content">
          <div className="admin_header-top">
            <h1 className="admin_header-title">Admin Panel</h1>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={handleLogout}
                className="admin_button admin_button-danger"
              >
                Logout
              </button>
            </div>
          </div>
          <nav className="admin_tabs">
            <button
              onClick={() => setView("profile")}
              className={`admin_tab-button ${
                view === "profile" ? "active" : ""
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => setView("projects")}
              className={`admin_tab-button ${
                ["projects", "addProject", "editProject"].includes(view)
                  ? "active"
                  : ""
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setView("skills")}
              className={`admin_tab-button ${
                ["skills", "addSkill", "editSkill"].includes(view)
                  ? "active"
                  : ""
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => setView("awards")}
              className={`admin_tab-button ${
                ["awards", "addAward", "editAward"].includes(view)
                  ? "active"
                  : ""
              }`}
            >
              Awards
            </button>
            <button
              onClick={() => setView("blogs")}
              className={`admin_tab-button ${
                ["blogs", "addBlog", "editBlog"].includes(view) ? "active" : ""
              }`}
            >
              Blogs
            </button>
            <button
              onClick={() => setView("experiences")}
              className={`admin_tab-button ${
                ["experiences", "addExperience", "editExperience"].includes(
                  view
                )
                  ? "active"
                  : ""
              }`}
            >
              Experiences
            </button>
            <button
              onClick={() => setView("clients")}
              className={`admin_tab-button ${
                ["clients", "addClient"].includes(view) ? "active" : ""
              }`}
            >
              Clients
            </button>
            <button
              onClick={() => setView("affiliates")}
              className={`admin_tab-button ${
                ["affiliates", "addAffiliate", "editAffiliate"].includes(view)
                  ? "active"
                  : ""
              }`}
            >
              Affiliate
            </button>
            <button
              onClick={() => setView("testimonials")}
              className={`admin_tab-button ${
                ["testimonials", "addTestimonial", "editTestimonial"].includes(
                  view
                )
                  ? "active"
                  : ""
              }`}
            >
              Testimonial
            </button>
          </nav>
        </div>
      </header>
      <main className="admin_main-content">
        {message && (
          <div
            className={`admin_message ${
              message.toLowerCase().includes("error") ||
              message.toLowerCase().includes("failed")
                ? "admin_message-error"
                : "admin_message-success"
            }`}
          >
            {message}
          </div>
        )}
        {renderView()}
      </main>
    </div>
    </>
  );
};

export default Admin;
