import { useEffect, useState } from "react";
import CustomNavbar from "../components/Navbar/CustomNavbar";
import axios from "axios";
import { useWalletDetails } from "../hooks/blockChain";
import { ReportCard } from "../components/Card/ReportCard";

export default function Reports() {
  const [reports, setReports] = useState([]);

  const [posts, setPosts] = useState([]);

  const [mapping, setMapping] = useState({});

  const { acc, FileFly } = useWalletDetails();

  const fetchPosts = async (obj) => {
    const indices = Object.keys(obj);
    let p = [];
    for (let i = 0; i < indices.length; i++) {
      p.push(await FileFly.methods.files(indices[i]).call());
    }
    setPosts(p);
  };

  const fetchReports = async () => {
    axios
      .get("/api/report/all")
      .then((res) => {
        let r = res.data.reports;
        let obj = {};
        r.map((rep) => {
          if (!obj[rep.post_index]) obj[rep.post_index] = [];
          obj[rep.post_index].push(rep);
        });
        setMapping({ ...obj });
        fetchPosts(obj);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (acc) fetchReports();
  }, [acc]);
  return (
    <>
      <CustomNavbar
        admin={true}
        owner={true}
        adminAddModalOpened={false}
        openAdminAddModal={() => {}}
      />
      <div>
        <h2 className="mx-12 mb-8 flex justify-center text-3xl">Reports</h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mx-10">
        {posts &&
          posts.map((p, i) => {
            return <ReportCard key={i} file={p} reports={mapping[p.index]} />;
          })}
      </div>
      {!posts.length && (
        <h1 className="flex justify-center text-lg italic">
          No reports found!
        </h1>
      )}
    </>
  );
}
