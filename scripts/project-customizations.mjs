import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import {
  addMeshingGearsToAppScript,
  addMeshingGearsToCss,
  addMeshingGearsToHtml,
} from "./gear-customizations.mjs";

const projectSubtitle =
  "Selected work in mechanical design, simulation, manufacturing, instrumentation, robotics, and embedded systems.";

const palmProject = {
  id: "palm-fruit-harvester",
  title: "Palm Fruit Harvesting System",
  short:
    "SolidWorks concept with servo-driven arms, a powered cutting/drilling attachment, mechanical claw, and fruit collection module.",
  image: "./images/palm-fruit-harvester.png",
  tags: ["SolidWorks", "FEA", "Pugh Matrix", "Motion Study"],
  course: "Mechanical Design Project",
  problem:
    "Develop a safer, more integrated method for harvesting palm fruit at height while reducing the need for manual cutting, gripping, and fruit handling.",
  solution:
    "Designed a mobile SolidWorks system with independently positioned servo arms, a rotating base, powered cutting/drilling attachment, mechanical claw, joystick control, and onboard fruit container. Concepts were selected after reviewing existing harvesting technologies.",
  implementation: [
    "Reviewed existing palm-harvesting equipment and translated design-review findings into functional requirements",
    "Hand-modeled the vehicle base, rotating joints, servo arms, cutting/drilling attachment, mechanical claw, control layout, and fruit container in SolidWorks",
    "Compared candidate concepts using a Pugh decision matrix before selecting the final architecture",
    "Performed an FEA study on key structural components to assess the selected design",
    "Created a basic SolidWorks Motion Study to animate the motor- and servo-driven mechanisms",
  ],
  results: [
    "Completed a detailed assembly integrating cutting, gripping, positioning, and collection functions",
    "Demonstrated the intended motor and arm sequence in the original SolidWorks motion study",
    "Archive note: the original interactive functionality is no longer supported",
  ],
  tools: [
    "SolidWorks",
    "Simulation / FEA",
    "Motion Study",
    "Pugh Matrix",
    "Design Review",
  ],
};

const instrumentationProject = {
  id: "iot-temperature-instrumentation",
  title: "IoT Temperature Instrumentation System",
  short:
    "ESP8266 measurement system combining thermistor sensing, analog signal conditioning, calibrated ADC processing, and Blynk cloud visualization.",
  image: "./images/iot-temperature-circuit.png",
  flowchart: "./images/iot-temperature-system-flow.svg",
  tags: ["Instrumentation", "ESP8266", "Signal Conditioning", "Blynk IoT"],
  course: "Instrumentation / Embedded Systems Project",
  problem:
    "Build an end-to-end temperature measurement system that converts a thermistor's nonlinear resistance response into a useful temperature reading and makes the data available for remote monitoring.",
  solution:
    "Collaborated with teammate Muhammad Arslan Babur across the full project to develop an instrumentation chain using an NTC thermistor, Wheatstone bridge, LM741-based signal conditioning, and the ESP8266's onboard ADC. Arduino firmware converts the sampled signal into voltage and temperature values, then publishes the results over Wi-Fi to a Blynk dashboard.",
  implementation: [
    "Worked jointly on the measurement concept, circuit integration, ESP8266 firmware, testing, and project documentation",
    "Finalized the signal-conditioning schematic in Fritzing, connecting the thermistor bridge, operational amplifier stage, filter, and ESP8266 analog input",
    "Used a Wheatstone bridge to translate resistance changes into a differential voltage and an LM741 stage to prepare the signal for conversion",
    "Programmed the ESP8266 in the Arduino IDE to sample A0, apply the project's calibration equations, and publish uptime, voltage, and temperature to Blynk",
    "Added Serial Monitor output for local inspection while maintaining the Wi-Fi connection and Blynk timer service loop",
  ],
  results: [
    "Completed a shared end-to-end build from physical temperature change to a remotely viewable digital measurement",
    "Integrated analog electronics, embedded C++ firmware, Wi-Fi communication, and cloud dashboarding in one system",
    "Demonstrated practical skills in instrumentation, sensor integration, calibration logic, and IoT data acquisition",
  ],
  tools: [
    "ESP8266",
    "Arduino IDE / C++",
    "Blynk IoT",
    "Fritzing",
    "Wheatstone Bridge",
    "LM741 Op-Amp",
    "Analog Signal Conditioning",
  ],
};

const thermalPlateProject = {
  id: "thermal-plate-optimization",
  title: "Thermal Plate Design & Heat-Transfer Study",
  short:
    "SolidWorks thermal study of a plate and surrounding-air heat interactions, with CAD geometry and simulation boundary conditions prepared for optimization.",
  image: "./images/thermal-plate-optimization.png",
  imageFit: "contain",
  tags: ["SolidWorks", "Thermal Analysis", "Heat Transfer", "Boundary Conditions"],
  course: "Thermal Design Study",
  problem:
    "Create a simulation-ready plate model that could capture temperature distribution and heat interaction with the surrounding air, giving the team a reliable basis for comparing design configurations.",
  solution:
    "Built the plate CAD model in SolidWorks and configured the thermal study boundary conditions needed to represent heat transfer between the plate and its environment. The prepared model supported the team's later optimization work and comparison of temperature-field results.",
  implementation: [
    "Created the plate geometry and organized the SolidWorks model for thermal simulation",
    "Entered the heat-transfer boundary conditions and environmental interactions used to represent the surrounding air",
    "Prepared a consistent simulation setup so candidate plate configurations could be compared using temperature contours and thermal-performance outputs",
    "Reviewed study results with the team and supported the optimization process while teammates led most of the optimization decisions",
  ],
  results: [
    "Produced a simulation-ready CAD model and boundary-condition setup for the team's thermal design study",
    "Visualized temperature gradients and heat-transfer behavior across the plate configurations",
    "Contribution focused on CAD modeling and simulation setup, with a limited supporting role in the final optimization",
  ],
  tools: [
    "SolidWorks",
    "SolidWorks Simulation",
    "Thermal Analysis",
    "Heat Transfer",
    "Boundary Conditions",
    "Design Review",
  ],
};

const drillBitProject = {
  id: "6mm-twist-drill",
  title: "6 mm Twist Drill CAD Model",
  short:
    "SolidWorks recreation of a standard 6 mm twist drill used as a manufacturing reference and exported in a neutral CAD format.",
  image: "./images/6-mm-twist-drill.png",
  imageFit: "contain",
  tags: ["SolidWorks", "Part Modeling", "Manufacturing", "STEP"],
  course: "Manufacturing CAD Practice",
  problem:
    "Recreate a commonly used manufacturing tool as a clean CAD model, following a standard 6 mm drill size and preserving the recognizable cutting and shank geometry.",
  solution:
    "Modeled the twist drill in SolidWorks with a cylindrical shank, helical flutes, and cutting-tip geometry, then exported the completed part as a millimeter-based STEP AP203 file for neutral CAD interchange.",
  implementation: [
    "Established the main drill body and shank around the standard 6 mm nominal size",
    "Created the helical flute geometry and cutting end visible in the finished model",
    "Refined the transitions between the fluted body and upper shank to produce a coherent single-part model",
    "Exported the SolidWorks 2025 model to STEP AP203 in millimeter units for compatibility with other CAD and manufacturing workflows",
  ],
  results: [
    "Completed a reusable 3D representation of a standard manufacturing drill bit",
    "Produced a neutral STEP model suitable for tooling visualization and CAD interchange",
    "Strengthened part-modeling practice with helical geometry and manufacturing-focused dimensions",
  ],
  tools: [
    "SolidWorks 2025",
    "STEP AP203",
    "Part Modeling",
    "Helical Geometry",
    "Manufacturing Reference",
  ],
};

const customProjects = [
  palmProject,
  instrumentationProject,
  thermalPlateProject,
  drillBitProject,
];

const enhancedCadSkills = [
  "SolidWorks",
  "SolidWorks Simulation",
  "Onshape",
  "AutoCAD",
  "Part Modeling",
  "STEP / CAD Interchange",
  "3D Printing (Bambu Lab)",
  "Technical Drawings",
];

const enhancedManufacturingSkills = [
  "Lathe",
  "Milling Machine",
  "Precision Measurement",
  "GD&T",
  "Assemblies / BOMs",
  "Machining Process Planning",
  "Prototype Testing",
];

const engineeringAnalysisSkills = [
  "FEA",
  "Thermal Analysis",
  "Heat Transfer",
  "Boundary Conditions",
  "Motion Studies",
  "Pugh Matrix",
  "Design Review",
];

const enhancedProgrammingSkills = [
  "Python",
  "Arduino / C++",
  "ESP8266 / Wi-Fi",
  "Blynk IoT",
  "Sensor Integration",
  "Analog Signal Conditioning",
  "ADC Calibration",
  "Automation Logic",
];

const skillCategories = [
  { label: "cad_design", items: enhancedCadSkills },
  { label: "manufacturing", items: enhancedManufacturingSkills },
  { label: "engineering_analysis", items: engineeringAnalysisSkills },
  { label: "embedded_instrumentation", items: enhancedProgrammingSkills },
  {
    label: "software",
    items: ["MS Excel (formulas, data)", "MS Word", "PowerPoint"],
  },
  {
    label: "documentation",
    items: ["Technical Reports", "Procedure Writing", "Material Tracking", "Excel Logs"],
  },
  {
    label: "professional",
    items: [
      "Communication",
      "Leadership",
      "Problem-Solving",
      "Adaptability",
      "Attention to Detail",
    ],
  },
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function projectCard(project, index) {
  const tags = project.tags
    .map(
      (tag) =>
        `<span class="font-mono text-[10px] text-primary/80 border border-primary/30 px-2 py-0.5 rounded">${escapeHtml(tag)}</span>`,
    )
    .join("");

  const imageClass = project.imageFit === "contain"
    ? "w-full h-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
    : "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105";

  return `<button class="group text-left bg-card border border-border rounded-md overflow-hidden hover:border-primary/60 hover:border-glow transition-all duration-300" style="animation-delay:${(index - 1) * 60}ms"><div class="relative aspect-[4/3] overflow-hidden border-b border-border bg-muted scan-line"><img src="${project.image}" alt="${escapeHtml(project.title)}" loading="lazy" width="1024" height="768" class="${imageClass}"/><div class="absolute top-3 left-3 font-mono text-[10px] text-primary bg-background/80 px-2 py-1 rounded border border-primary/30">PROJECT_<!-- -->${String(index).padStart(2, "0")}</div></div><div class="p-5"><h3 class="font-mono text-base font-semibold text-foreground group-hover:text-primary transition-colors">${escapeHtml(project.title)}</h3><p class="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-3">${escapeHtml(project.short)}</p><div class="mt-4 flex flex-wrap gap-1.5">${tags}</div><div class="mt-4 font-mono text-xs text-muted-foreground group-hover:text-primary transition-colors flex items-center gap-1">&gt; click to view full details</div></div></button>`;
}

function removeProjectCard(source, project) {
  let html = source;
  const alt = `alt="${escapeHtml(project.title)}"`;
  let altIndex = html.indexOf(alt);

  while (altIndex >= 0) {
    const start = html.lastIndexOf(
      '<button class="group text-left bg-card border border-border rounded-md overflow-hidden hover:border-primary/60 hover:border-glow transition-all duration-300"',
      altIndex,
    );
    const end = html.indexOf("</button>", altIndex);
    if (start < 0 || end < 0) {
      throw new Error(`Could not isolate the ${project.title} card in index.html`);
    }
    html = `${html.slice(0, start)}${html.slice(end + "</button>".length)}`;
    altIndex = html.indexOf(alt);
  }

  return html;
}

function skillCategoryCard(category) {
  const skillClass =
    "font-mono text-xs px-2.5 py-1 rounded border border-border bg-secondary/30 text-foreground hover:border-primary/50 hover:text-primary transition-colors";
  const items = category.items
    .map((skill) => `<span class="${skillClass}">${escapeHtml(skill)}</span>`)
    .join("");
  return `<div class="bg-card border border-border rounded-md p-5 hover:border-primary/40 transition-colors"><div class="font-mono text-xs text-primary mb-3"><span class="text-muted-foreground">&quot;</span>${escapeHtml(category.label)}<span class="text-muted-foreground">&quot;: [</span></div><div class="flex flex-wrap gap-2 pl-4">${items}</div><div class="font-mono text-xs text-muted-foreground mt-3">]</div></div>`;
}

function findMatchingDivEnd(source, start) {
  const tagPattern = /<\/?div\b[^>]*>/g;
  tagPattern.lastIndex = start;
  let depth = 0;
  let match;
  while ((match = tagPattern.exec(source))) {
    if (match[0].startsWith("</")) {
      depth -= 1;
      if (depth === 0) {
        return match.index + match[0].length;
      }
    } else {
      depth += 1;
    }
  }
  return -1;
}

function addSkillsToHtml(source) {
  const sectionStart = source.indexOf('<section id="skills"');
  const gridMarker = '<div class="grid sm:grid-cols-2 gap-4">';
  const gridStart = source.indexOf(gridMarker, sectionStart);
  const gridEnd = findMatchingDivEnd(source, gridStart);
  if (sectionStart < 0 || gridStart < 0 || gridEnd < 0) {
    throw new Error("Could not locate the skills grid in index.html");
  }

  const contentStart = gridStart + gridMarker.length;
  const contentEnd = gridEnd - "</div>".length;
  const cards = skillCategories.map(skillCategoryCard).join("");
  return `${source.slice(0, contentStart)}${cards}${source.slice(contentEnd)}`;
}

function addAboutSkillsToHtml(source) {
  return source
    .replace(
      "SolidWorks, Onshape, AutoCAD, Arduino, Python, machining",
      "SolidWorks, SolidWorks Simulation, Onshape, AutoCAD, Arduino, ESP8266, Python, machining",
    )
    .replace(
      "SolidWorks, Onshape, AutoCAD, 3D printing.",
      "SolidWorks, part modeling, FEA, thermal analysis, and motion studies.",
    )
    .replace(
      "Arduino, sensor integration, Python automation logic.",
      "Arduino, ESP8266, signal conditioning, ADC calibration, and Blynk IoT.",
    );
}

export function addCustomProjectsToHtml(source) {
  let html = source.replace(
    "Selected work in robotics, embedded systems, and autonomous engineering.",
    projectSubtitle,
  );

  html = html.replace(
    "Selected work in mechanical design, manufacturing, robotics, and embedded systems.",
    projectSubtitle,
  );

  html = html.replace(
    "Selected work in mechanical design, manufacturing, instrumentation, robotics, and embedded systems.",
    projectSubtitle,
  );

  for (const [offset, project] of customProjects.entries()) {
    html = removeProjectCard(html, project);

    const gardenIndex = html.indexOf('alt="Garden Guardian — Automated Monitoring System"');
    const sectionMarker = "</button></div></div></section><section id=\"about\"";
    const markerIndex = html.indexOf(sectionMarker, gardenIndex);
    if (gardenIndex < 0 || markerIndex < 0) {
      throw new Error("Could not locate the project grid in index.html");
    }

    const insertAt = markerIndex + "</button>".length;
    html = `${html.slice(0, insertAt)}${projectCard(project, 6 + offset)}${html.slice(insertAt)}`;
  }

  return addMeshingGearsToHtml(addAboutSkillsToHtml(addSkillsToHtml(html)));
}

function addFlowchartSupportToAppScript(source) {
  if (source.includes("t.flowchart&&")) {
    return source;
  }

  const imageBlock = 'e.jsx("div",{className:"aspect-[16/9] overflow-hidden rounded border border-border mb-6 bg-muted",children:e.jsx("img",{src:t.image,alt:t.title,loading:"lazy",width:1024,height:768,className:"w-full h-full object-cover"})})';
  const flowchartBlock = `${imageBlock},t.flowchart&&e.jsxs("div",{className:"mb-6",children:[e.jsx("div",{className:"font-mono text-xs uppercase tracking-wider text-primary mb-3",children:"// System Flow"}),e.jsx("div",{className:"aspect-[16/9] overflow-hidden rounded border border-border bg-muted",children:e.jsx("img",{src:t.flowchart,alt:t.title+" system flow",loading:"lazy",width:1600,height:900,className:"w-full h-full object-contain"})})]})`;

  if (!source.includes(imageBlock)) {
    throw new Error("Could not locate the project modal image block");
  }

  return source.replace(imageBlock, flowchartBlock);
}

function addImageFitSupportToAppScript(source) {
  let script = source;
  const cardOriginal =
    'className:"w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"';
  const cardEnhanced =
    'className:`w-full h-full ${a.imageFit==="contain"?"object-contain p-3":"object-cover"} transition-transform duration-500 group-hover:scale-105`';
  if (!script.includes(cardEnhanced)) {
    if (!script.includes(cardOriginal)) {
      throw new Error("Could not locate the compiled project-card image class");
    }
    script = script.replace(cardOriginal, cardEnhanced);
  }

  const modalOriginal = 'className:"w-full h-full object-cover"';
  const modalEnhanced =
    'className:t.imageFit==="contain"?"w-full h-full object-contain p-2":"w-full h-full object-cover"';
  if (!script.includes(modalEnhanced)) {
    if (!script.includes(modalOriginal)) {
      throw new Error("Could not locate the compiled project-modal image class");
    }
    script = script.replace(modalOriginal, modalEnhanced);
  }

  return script;
}

function addSkillsToAppScript(source) {
  const dataStart = source.indexOf("const we=");
  const dataEnd = source.indexOf(";function Ne", dataStart);
  if (dataStart < 0 || dataEnd < 0) {
    throw new Error("Could not locate the compiled skills data");
  }
  return `${source.slice(0, dataStart)}const we=${JSON.stringify(skillCategories)}${source.slice(dataEnd)}`;
}

function addAboutSkillsToAppScript(source) {
  return source
    .replace(
      "SolidWorks, Onshape, AutoCAD, Arduino, Python, machining",
      "SolidWorks, SolidWorks Simulation, Onshape, AutoCAD, Arduino, ESP8266, Python, machining",
    )
    .replace(
      'title:"CAD / Design",desc:"SolidWorks, Onshape, AutoCAD, 3D printing."',
      'title:"CAD / Design",desc:"SolidWorks, part modeling, FEA, thermal analysis, and motion studies."',
    )
    .replace(
      'title:"Embedded",desc:"Arduino, sensor integration, Python automation logic."',
      'title:"Embedded",desc:"Arduino, ESP8266, signal conditioning, ADC calibration, and Blynk IoT."',
    );
}

export function addCustomProjectsToAppScript(source) {
  let script = source.replace(
    "Selected work in robotics, embedded systems, and autonomous engineering.",
    projectSubtitle,
  );

  script = script.replace(
    "Selected work in mechanical design, manufacturing, robotics, and embedded systems.",
    projectSubtitle,
  );

  script = script.replace(
    "Selected work in mechanical design, manufacturing, instrumentation, robotics, and embedded systems.",
    projectSubtitle,
  );

  for (const project of customProjects) {
    const escapedId = project.id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const existingProject = new RegExp(
      `,\\{"id":"${escapedId}"[\\s\\S]*?\\}(?=,\\{"id":"|\\];function)`,
      "g",
    );
    script = script.replace(existingProject, "");
  }

  const gardenIndex = script.indexOf('id:"garden-guardian"');
  const projectArrayEnd = script.indexOf("];function", gardenIndex);
  if (gardenIndex < 0 || projectArrayEnd < 0) {
    throw new Error("Could not locate the compiled project data");
  }
  const compiledProjects = customProjects
    .map((project) => `,${JSON.stringify(project)}`)
    .join("");
  script = `${script.slice(0, projectArrayEnd)}${compiledProjects}${script.slice(projectArrayEnd)}`;

  return addMeshingGearsToAppScript(addAboutSkillsToAppScript(
    addSkillsToAppScript(
      addImageFitSupportToAppScript(addFlowchartSupportToAppScript(script)),
    ),
  ));
}

export async function applyProjectCustomizations() {
  const htmlPath = "index.html";
  const appScriptPath = "assets/index-DaL05lpB.js";
  const cssPath = "assets/styles-Dtw_Dlqv.css";
  const html = await readFile(htmlPath, "utf8");
  const appScript = await readFile(appScriptPath, "utf8");
  const css = await readFile(cssPath, "utf8");

  await writeFile(htmlPath, addCustomProjectsToHtml(html));
  await writeFile(appScriptPath, addCustomProjectsToAppScript(appScript));
  await writeFile(cssPath, addMeshingGearsToCss(css));
}

const invokedDirectly =
  process.argv[1] &&
  import.meta.url === pathToFileURL(resolve(process.argv[1])).href;

if (invokedDirectly) {
  await applyProjectCustomizations();
  console.log("Applied portfolio project customizations.");
}
