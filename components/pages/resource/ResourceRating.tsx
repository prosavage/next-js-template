import React, { useEffect, useState } from "react";
import { Droplet } from "react-feather";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { themeState } from "../../../atoms/theme";
import PropsTheme from "../../../styles/theme/PropsTheme";
import { Resource } from "../../../types/Resource";
import { Review } from "../../../types/Review";
import getAxios from "../../../util/AxiosInstance";
import useToast from "../../../util/hooks/useToast";
import Button from "../../ui/Button";
import ReviewEntry from "./ReviewEntry";

export default function ResourceReview({ resource }: { resource: Resource }) {
  const theme = useRecoilValue(themeState);

  const [rating, setRating] = useState(0);
  const [preview, setPreview] = useState(true);
  const [message, setMessage] = useState("");
  const [reviews, setReviews] = useState<Review[]>([]);

  const [status, setStatus] = useState("");

  const toast = useToast();

  useEffect(() => {
    // while loading...
    if (!resource) return;
    fetchReviews();
  }, [resource]);

  const fetchReviews = () => {
    getAxios()
      .get(`/directory/reviews/${resource?._id}`)
      .then((res) => setReviews(res.data.payload.reviews))
      .catch((err) => console.log(err.response.data));
  };

  const postRating = () => {
    if (message.length <= 50) {
      setStatus("Review is not comprehensive enough, please add more info.");
      return;
    }

    if (message.length >= 500) {
      setStatus("Review is too long, 500 chars max.");
      return;
    }

    if (preview) {
      setStatus(
        "Resource rating not set, click the droplets for your desired rating."
      );
      return;
    }
    getAxios()
      .put("/review", {
        message,
        rating,
        resource: resource._id,
      })
      .then((res) => {
        fetchReviews();
        toast("Review posted successfully");
        setMessage("");
        setStatus("");
        setPreview(true);
        setRating(0);
      })
      .catch((err) => setStatus(err.response.data.error));
  };

  const getRatingDrops = () => {
    const drops = [];
    // const rating = props.resource.rating;
    let counter = 0;
    const size = 25;
    const color = theme.accentColor;
    for (let i = 0; i < 5; i++) {
      drops.push(
        <Droplet
          key={counter}
          size={size}
          color={color}
          fill={i + 1 > rating ? "none" : color}
          onClick={() => {
            setPreview(false);
            setRating(i + 1);
          }}
          onMouseEnter={() => {
            if (preview) {
              setRating(i + 1);
            }
          }}
          onMouseLeave={() => {
            if (preview) {
              setRating(0);
            }
          }}
        />
      );
      counter++;
    }
    return drops;
  };

  return (
    <Wrapper>
      <Title>
        <h1>Ratings</h1>
      </Title>
      <Status>{status}</Status>
      <ReviewArea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={"Review goes here..."}
      />
      <RatingSelect>
        <RatingDrops>{getRatingDrops()}</RatingDrops>
        <p>Selected Rating: {rating}/5</p>
        <Button onClick={() => postRating()}>Post Review</Button>
      </RatingSelect>
      {reviews.map((review) => (
        <ReviewEntry key={review._id} review={review} onDelete={() => fetchReviews()}/>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border: 1px solid ${(props: PropsTheme) => props.theme.borderColor};
  padding: 1em;
  border-radius: 4px;
  margin-bottom: 1em;
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ReviewArea = styled.textarea`
  height: 150px;
`;
const RatingDrops = styled.div`
  display: flex;
  margin: 0.5em 0;
`;

const RatingSelect = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 0.5em;
`;

const Status = styled.p`
  color: ${(props: PropsTheme) => props.theme.errorColor};
`;
