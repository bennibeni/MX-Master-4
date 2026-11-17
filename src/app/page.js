import MxMaster4Guide from "@/components/mx-master-4/MxMaster4Guide";

export default function HomePage() {
  return (
    <div className="app-shell">
      <MxMaster4Guide
        footer={
          <footer className="projects-footer">
            <a href="https://links-page-bennibeni.vercel.app/">
              <span aria-hidden="true">← </span>All projects
            </a>
          </footer>
        }
      />
    </div>
  );
}
