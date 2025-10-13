import { BulletList } from "./bullet-list";
import Section from "./section";
import type { CVData } from "./types";

export default function CV({ cvData }: { cvData: CVData }) {
  return (
    <div
      id="pdf"
      className="w-[210mm] min-h-[297mm] mx-auto p-8 bg-white shadow-lg"
    >
      <header className="text-center mb-2">
        <h1>{cvData.personal.name}</h1>
        <div className="flex items-center flex-wrap justify-center gap-x-1">
          <p>{cvData.personal.email}</p>
          <span className="text-base">|</span>
          <p>{cvData.personal.phone}</p>
          <span className="text-base">|</span>
          <p>
            <a
              href={cvData.personal.linkedinURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cvData.personal.linkedin}
            </a>
          </p>
          <span className="text-base">|</span>
          <p>
            <a
              href={cvData.personal.githubURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cvData.personal.github}
            </a>
          </p>
          <span className="text-base">|</span>
          <p>
            <a
              href={cvData.personal.websiteURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {cvData.personal.website}
            </a>
          </p>
        </div>
      </header>
      <Section title={cvData.experience.title}>
        {cvData.experience.items.map((exp, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3>{exp.company}</h3>
                <p className="italic">{exp.position}</p>
              </div>
              <div className="flex flex-col items-end italic">
                <p>{exp.location}</p>
                <p>
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>
            </div>
            <BulletList bullets={exp.bullets} />
          </div>
        ))}
      </Section>
      <Section title={cvData.projects.title}>
        {cvData.projects.items.map((project, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3>{project.name}</h3>
              </div>
              <div className="flex flex-col items-end italic">
                <p>
                  {project.startDate} - {project.endDate}
                </p>
              </div>
            </div>
            <BulletList bullets={project.bullets} />
          </div>
        ))}
      </Section>
      <Section title={cvData.education.title}>
        {cvData.education.items.map((edu, index) => (
          <div key={index} className="mb-2">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <h3>{edu.degree}</h3>
                <p className="italic">{edu.institution}</p>
              </div>
              <div className="flex flex-col items-end italic">
                <p>
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            </div>
            <BulletList bullets={edu.bullets} />
          </div>
        ))}
      </Section>
      <Section title={cvData.skills.title}>
        <p>{cvData.skills.items.join(", ")}.</p>
      </Section>
    </div>
  );
}
