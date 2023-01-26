import { useEffect, useState } from "react";
import usePostDetails from "../hooks/use-post-details";
import { useDispatch } from "react-redux";
import { editPost, clearRecord} from "../store/postSlice";
import { useNavigate } from "react-router-dom";

import Loading from "../components/Loading";
import { Form, Button } from "react-bootstrap";

const EditPost = () => {
  const { loading: dataLoading, error: dataError, record } = usePostDetails();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  useEffect(() => {
    if (record) {
      setTitle(record?.title);
      setDescription(record?.description);
    }
  }, [record]);

  
  useEffect(() => {
    return () => {
      dispatch(clearRecord())
    }
  }, [dispatch])


  const formHandler = (e) => {
    e.preventDefault();
    dispatch(editPost({id: record?.id, title, description})).unwrap().then(() => navigate("/"));
  };

  return (
    <Loading loading={dataLoading} error={dataError}>
      <Form onSubmit={formHandler}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Loading>
  );
};

export default EditPost;
