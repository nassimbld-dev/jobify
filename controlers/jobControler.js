import { nanoid } from "nanoid";

let jobs = [
    {id: nanoid(), title: "Software Developer", company: "Google"},
    {id: nanoid(), title: "Frontend Developer", company: "Facebook"},]

export const getJobs = (req, res) => {
    res.status(200).json({
        jobs,
    });
}

export const createJob = (req, res) => {
    const { title, company} = req.body;
    console.log(title, company);
    if(!title || !company) {
        return res.status(400).json({
            error: "title and company are required",
        });
        return;
    }

    const id = nanoid(10); 
    const newJob = {id, title, company};

    jobs.push(newJob);

    res.status(201).json(newJob);
}

export const getJob = (req, res) => {
    const {id}= req.params;
    console.log(id);
    //avec les accolades ça ne fonctionne pas parce que return avec accolades(dans notre cas pas de return)
    //deuxième problème type 
    const job= jobs.find((i)=>i.id==id)
    console.log(jobs[0].id )
    if(!job){
        return res.status(404).json({message: 'job not found'});
    }
    res.status(201).json(job);
}

export const deleteJob = (req, res) => {
    const {id} = req.params;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }
    jobs = jobs.filter((job) => job.id !== id);
    res.status(200).json({message: "Job deleted successfully"});
}   

export const updateJob = (req, res) => {
    const { id } = req.params;
    const { title, company } = req.body;
    const job = jobs.find((job) => job.id === id);
    if (!job) {
        return res.status(404).json({ error: "Job not found" });
    }
    job.title = title || job.title;
    job.company = company || job.company;
    res.status(200).json(job);
};


