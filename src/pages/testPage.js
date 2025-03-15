import React, { useState } from "react";

function RoleRedirect() {
  const [role, setRole] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const roleLower = role.toLowerCase().trim();

    if (roleLower === "admin") {
      window.location.href = "/admin";
    } else if (roleLower === "doctor") {
      window.location.href = "/doctor";
    } else if (roleLower === "nurse") {
      window.location.href = "/nurse";
    } else {
      alert("Role not recognized! Please enter admin, doctor, or nurse.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        background: "#f5f5f5",
      }}
    >
      <h1>Enter Your Role</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Enter admin, doctor, or nurse"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "16px",
            marginRight: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RoleRedirect;