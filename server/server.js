const express = require("express");
var cors = require("cors");
const req = require("express/lib/request");
const res = require("express/lib/response");
var bodyParser = require("body-parser");
const _ = require("lodash");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

let notes = [
  {
    id: "5ff5da1-e67f-bc5-b5ce-8101ccdfede",
    title: "afaf",
    body: "\nasf\n\nf\naf\n\nsf\nasf\nas\nf",
    lastModified: 1645581810450,
    folderId: "ed272d-118-86c-3d4f-250d1be008d",
  },
  {
    id: "177b674-8535-e1e-cc4-b38d00a0a8",
    title: "asfasfafaf",
    body: "",
    lastModified: 1645581795848,
    folderId: "ed272d-118-86c-3d4f-250d1be008d",
  },
  {
    id: "3cc5f61-f44-d0b1-0abf-c34684ad2ce2",
    title: "asdasdad",
    body: "\naf\nf\n\nfas\nf\nas\nf\nsfa",
    lastModified: 1645581785835,
    folderId: "ed272d-118-86c-3d4f-250d1be008d",
  },
  {
    id: "0667a7-db3e-eeb6-d3ce-ef0573a7fd3b",
    title: "jasjkhkjfas",
    body: "\nasf\na\nsfafs\nasf\naf\nas\nf\nsaf\nas\nf\nf\n\nasf\nagg\na\n\nag\nag\n",
    lastModified: 1645581150014,
    folderId: "ed272d-118-86c-3d4f-250d1be008d",
  },
  {
    id: "b3acd-6aba-cbc6-c44d-b33a4a1e44",
    title: "dsdfsdfdsfsdfsdfsdfdsfdsfdsfsfsdfsdsdfdsfsfsfs",
    body: "\ndsf\nds\nf\nsdf\ns\nf\nds\nfsd\nf\ndsf\nsdf\nds\n\nfdsffd",
    lastModified: 1645583072486,
    folderId: "ed272d-118-86c-3d4f-250d1be008d",
  },
  {
    id: "244421b-80ae-4ea7-3012-57c63b35ca0",
    title: "Enter Title Here",
    body: "\nds\nfds\nf\nsdf",
    lastModified: 1645582757663,
    folderId: "2b4bc-6386-a8a-88e3-771cb80fb31b",
  },
  {
    id: "42b2757-dcc3-6882-af34-8b162dbf023f",
    title: "safaf",
    body: "",
    lastModified: 1645582454875,
    folderId: "2b4bc-6386-a8a-88e3-771cb80fb31b",
  },
  {
    id: "efdff25-ea7f-7664-f74-16b026b445c7",
    title: "jfjkhfd",
    body: "\nds\nsd\nf\nsdf\ndsf",
    lastModified: 1645552897952,
    folderId: "2b4bc-6386-a8a-88e3-771cb80fb31b",
  },
  {
    id: "724c2ec-57a-a871-bd60-fa77864bc24c",
    title: "adafasfwdd",
    body: "",
    lastModified: 1645550743985,
    folderId: "2b4bc-6386-a8a-88e3-771cb80fb31b",
  },
];

let folders = [
  {
    id: "2b4bc-6386-a8a-88e3-771cb80fb31b",
    title: "Templetae",
    lastModified: 1645552919146,
    notes: [
      {
        id: "5ff5da1-e67f-bc5-b5ce-8101ccdfede",
      },
      {
        id: "177b674-8535-e1e-cc4-b38d00a0a8",
      },
      {
        id: "3cc5f61-f44-d0b1-0abf-c34684ad2ce2",
      },
      {
        id: "0667a7-db3e-eeb6-d3ce-ef0573a7fd3b",
      },
    ],
  },
  {
    id: "ed272d-118-86c-3d4f-250d1be008d",
    title: "My Folder1",
    lastModified: 1645552633036,
    notes: [
      {
        id: "b3acd-6aba-cbc6-c44d-b33a4a1e44",
      },
      {
        id: "244421b-80ae-4ea7-3012-57c63b35ca0",
      },
      {
        id: "42b2757-dcc3-6882-af34-8b162dbf023f",
      },
      {
        id: "efdff25-ea7f-7664-f74-16b026b445c7",
      },
    ],
  },
  {
    id: "d4a4f7d-e1a-eb6-c551-ef104a46d47b",
    title: "My College Notes",
    lastModified: 1645550226884,
    notes: [
      {
        id: "724c2ec-57a-a871-bd60-fa77864bc24c",
      },
    ],
  },
];

app.get("/folders", (req, res) => {
  return res.send(folders);
});

app.post("/folders/create", (req, res) => {
  folders = [...folders, req.body];
  return res.send(folders);
});

app.post("/folders/update", (req, res) => {
  const { id } = req.body;
  folders = folders.map((item) =>
    item.id === id ? { ...item, ...req.body } : item
  );
  return res.send(folders);
});

app.delete("/folders/delete", (req, res) => {
  const { id } = req.body;
  folders = folders.filter((item) => item.id !== id);
  return res.send(folders);
});

app.get("/notes", (req, res) => {
  // console.log("req.params(fid)", req.query["fid");
  const { fid } = req.query;
  return res.send(notes.filter((note) => note.folderId === fid));
});

app.delete("/notes", (req, res) => {
  const { nid, fid } = req.body;
  const f = folders.find((item) => item.id === fid);
  const nt = f.notes.filter((item) => item.id !== nid);
  notes = notes.filter((item) => item.id !== nid);
  folder = folders.map((item) =>
    item.id === fid ? { ...item, notes: nt } : item
  );
  return res.send(folder);
});

app.post("/notes/update", (req, res) => {
  const { nid, fid } = req.query;
  const f = folders.find((item) => item.id === fid);
  const nt = f.notes.find((item) => item.id === nid);
  notes = notes.filter((item) => item.id !== nid);
  folder = folders.map((item) =>
    item.id === fid ? { ...item, notes: { ...nt, ...req.body } } : item
  );
  return res.send(notes);
});

app.post("/notes", (req, res) => {
  const { fid, newNote } = req.body;
  notes = [...notes, newNote];
  const notelist = notes.filter((note) => note.folderId === fid);
  const tempList = folders.map((item) =>
    item.id === fid ? { ...item, notes: notelist } : item
  );
  return res.send(tempList);
});

app.listen(4000, () => {
  console.log("running server on port 4000");
});
