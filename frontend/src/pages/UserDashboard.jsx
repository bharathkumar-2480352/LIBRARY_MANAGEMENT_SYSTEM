import React, { useMemo, useState } from "react";

/**
 * LibraryDashboard (Bootstrap version, no Navbar)
 * - Sidebar (static) + Main content
 * - Summary cards, Loans, Reservations, Ready for Pickup, Hours, Digital Card
 * - Interactions: Renew (+14 days), Pay Fine (resets fine + overdue)
 */

// Utility: format currency
const fmtCurrency = (n) =>
  n.toLocaleString(undefined, { style: "currency", currency: "USD" });

// Utility: parse a "DD Mon" string for the current year and return a Date
const parseDueDate = (label) => {
  // Examples: "12 Oct", "02 Oct"
  const [dd, monAbbr] = label.trim().split(/\s+/);
  const mon = [
    "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"
  ].indexOf(monAbbr);
  const year = new Date().getFullYear();
  return new Date(year, mon, Number(dd));
};

// Utility: format a date as "DD Mon"
const formatDue = (date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const monAbbr = date.toLocaleString(undefined, { month: "short" });
  return `${dd} ${monAbbr}`;
};

export default function UserDashboard() {
  // --- Sample data ---
  const [summary, setSummary] = useState({
    loans: 4,
    overdue: 1,
    holds: 2,
    fines: 2.5,
  });

  const [loans, setLoans] = useState([
    { id: "gats", title: "The Great Gatsby", due: "12 Oct", overdue: false },
    { id: "dune1", title: "Dune: Part 1", due: "15 Oct", overdue: false },
    { id: "1984", title: "1984 (ORWELL)", due: "02 Oct", overdue: true },
  ]);

  const [reservations] = useState([
    { id: "hail", title: "Project Hail", status: "In Transit", position: null },
    { id: "found", title: "Foundation", status: "Pending", position: "3 of 12" },
  ]);

  const readyForPickup = useMemo(
    () => ({ title: "Atomic Habits", branch: "Main Branch", shelf: "A-12" }),
    []
  );

  const hours = useMemo(
    () => ({ label: "Mon–Fri: 9–8", status: "OPEN" }),
    []
  );

  const digitalCard = useMemo(
    () => ({ id: "882019" }),
    []
  );

  // --- Handlers ---
  const handleRenew = (loanId) => {
    setLoans((prev) =>
      prev.map((l) => {
        if (l.id !== loanId) return l;
        const newDate = new Date(parseDueDate(l.due));
        newDate.setDate(newDate.getDate() + 14);
        return { ...l, due: formatDue(newDate), overdue: false };
      })
    );

    // Reduce overdue count if that item was overdue
    setSummary((s) => {
      const target = loans.find((l) => l.id === loanId);
      const wasOverdue = target?.overdue;
      return wasOverdue && s.overdue > 0 ? { ...s, overdue: s.overdue - 1 } : s;
    });
  };

  const handlePayFine = () => {
    setSummary((s) => ({ ...s, fines: 0, overdue: 0 }));
    setLoans((prev) => prev.map((l) => ({ ...l, overdue: false })));
  };

  return (
    <div className="container-fluid my-3">
      <div className="row">
        {/* Sidebar */}
        <aside className="col-12 col-md-3 col-lg-2 mb-3">
          <div className="list-group shadow-sm">
            <button className="list-group-item list-group-item-action active">
              <span role="img" aria-label="home">🏠</span> Dashboard
            </button>
            <button className="list-group-item list-group-item-action">
              📚 My Books
            </button>
            <button className="list-group-item list-group-item-action">
              🔍 Catalog
            </button>
            <button className="list-group-item list-group-item-action">
              💳 Fines ($)
            </button>
            <button className="list-group-item list-group-item-action">
              🔖 Wishlist
            </button>
          </div>

          <div className="list-group mt-3 shadow-sm">
            <button className="list-group-item list-group-item-action">
              ⚙️ Settings
            </button>
            <button className="list-group-item list-group-item-action">
              🚪 Logout
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="col-12 col-md-9 col-lg-10">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h1 className="h4 m-0">Welcome back, Alex! 👋</h1>
          </div>

          {/* Summary cards */}
          <div className="row g-3 mb-3">
            <div className="col-6 col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="text-muted text-uppercase small">Loans</div>
                  <div className="fs-3 fw-bold">{summary.loans}</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className={`card shadow-sm h-100 ${summary.overdue > 0 ? "border-danger" : ""}`}>
                <div className="card-body">
                  <div className="text-muted text-uppercase small">Overdue</div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="fs-3 fw-bold">{summary.overdue}</div>
                    {summary.overdue > 0 && (
                      <span className="badge bg-danger">Action needed</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <div className="text-muted text-uppercase small">Holds</div>
                  <div className="fs-3 fw-bold">{summary.holds}</div>
                </div>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className={`card shadow-sm h-100 ${summary.fines > 0 ? "border-warning" : ""}`}>
                <div className="card-body">
                  <div className="text-muted text-uppercase small">Fines</div>
                  <div className="d-flex align-items-center gap-2">
                    <div className="fs-3 fw-bold">{fmtCurrency(summary.fines)}</div>
                    {summary.fines > 0 && (
                      <span className="badge bg-warning text-dark">Unpaid</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loans + Right Column */}
          <div className="row g-3 mb-3">
            {/* Current Loans */}
            <div className="col-12 col-lg-8">
              <div className="card shadow-sm">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h2 className="h6 m-0">Current Loans</h2>
                </div>
                <div className="table-responsive">
                  <table className="table align-middle table-hover m-0">
                    <thead className="table-light">
                      <tr>
                        <th>Title</th>
                        <th>Due Date</th>
                        <th className="text-end" style={{ width: 140 }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loans.map((loan) => (
                        <tr key={loan.id} className={loan.overdue ? "table-danger" : ""}>
                          <td>{loan.title}</td>
                          <td>
                            {loan.due}{" "}
                            {loan.overdue && (
                              <span className="badge bg-danger ms-2" aria-label="Overdue">!</span>
                            )}
                          </td>
                          <td className="text-end">
                            {!loan.overdue ? (
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() => handleRenew(loan.id)}
                                aria-label={`Renew ${loan.title}`}
                              >
                                Renew
                              </button>
                            ) : (
                              <button
                                className="btn btn-primary btn-sm"
                                onClick={handlePayFine}
                                aria-label={`Pay fine for ${loan.title}`}
                              >
                                Pay Fine
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right column stack */}
            <div className="col-12 col-lg-4">
              {/* Ready for Pickup */}
              <div className="card shadow-sm mb-3">
                <div className="card-header">
                  <h2 className="h6 m-0">Ready for Pickup</h2>
                </div>
                <div className="card-body d-flex gap-3 align-items-center">
                  <div
                    className="d-inline-flex align-items-center justify-content-center rounded"
                    style={{
                      width: 56,
                      height: 56,
                      background: "var(--bs-light)",
                      fontSize: 28,
                    }}
                    aria-hidden
                  >
                    📙
                  </div>
                  <div>
                    <div className="fw-semibold">{readyForPickup.title}</div>
                    <div className="text-muted small">Branch: {readyForPickup.branch}</div>
                    <div className="text-muted small">Shelf: {readyForPickup.shelf}</div>
                  </div>
                </div>
              </div>

              {/* Library Hours */}
              <div className="card shadow-sm mb-3">
                <div className="card-header">
                  <h2 className="h6 m-0">Library Hours</h2>
                </div>
                <div className="card-body">
                  <div className="text-muted">{hours.label}</div>
                  <div className="fw-semibold mt-1">
                    Status: <span className="badge bg-success">{hours.status} ✅</span>
                  </div>
                </div>
              </div>

              {/* Digital Card */}
              <div className="card shadow-sm">
                <div className="card-header">
                  <h2 className="h6 m-0">Digital Card</h2>
                </div>
                <div className="card-body position-relative" style={{ minHeight: 120 }}>
                  <div
                    className="rounded mb-3"
                    style={{
                      width: 38,
                      height: 28,
                      background:
                        "linear-gradient(180deg, #ffca61, #cc9a3e)",
                    }}
                    aria-hidden
                  />
                  <div className="position-absolute top-0 end-0 p-3 d-grid gap-2" aria-hidden>
                    <div style={{ width: 54, height: 6, background: "rgba(0,0,0,.1)", borderRadius: 3 }} />
                    <div style={{ width: 54, height: 6, background: "rgba(0,0,0,.1)", borderRadius: 3 }} />
                    <div style={{ width: 54, height: 6, background: "rgba(0,0,0,.1)", borderRadius: 3 }} />
                    <div style={{ width: 34, height: 6, background: "rgba(0,0,0,.1)", borderRadius: 3 }} />
                  </div>
                  <div className="position-absolute bottom-0 end-0 p-3 fw-bold">
                    ID: {digitalCard.id}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Reservations */}
          <div className="card shadow-sm">
            <div className="card-header">
              <h2 className="h6 m-0">Your Reservations (Queues)</h2>
            </div>
            <div className="table-responsive">
              <table className="table align-middle table-hover m-0">
                <thead className="table-light">
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                    <th>Position</th>
                  </tr>
                </thead>
                <tbody>
                  {reservations.map((r) => (
                    <tr key={r.id}>
                      <td>{r.title}</td>
                      <td>{r.status}</td>
                      <td>{r.position ?? "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
``