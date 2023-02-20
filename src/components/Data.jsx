import React, { useState, useEffect } from "react";
import { Box, Card, ImageList, ImageListItem } from "@mui/material";
import UtilityBox from "../UI/Box";

export default function Data() {
  const [images, setImages] = useState([]);

  const url = "https://api.thecatapi.com/v1/images/search?format=json&limit=10";

  useEffect(() => {
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          return Error("Oh no");
        }
        return res.json();
      })
      .then((data) => setImages(data));
  }, []);

  return (
    <UtilityBox>
      {" "}
      <Card
        sx={{
          width: {
            xs: "auto",
          },
          mt: 15,
          p: 3,
        }}
      >
        <ImageList
          sx={{ width: 500, height: 450 }}
          variant="woven"
          cols={3}
          gap={8}
        >
          {images.map((item) => (
            <ImageListItem key={item.img}>
              <img
                src={`${item.url}?w=164&h=164&fit=crop&auto=format`}
                srcSet={`${item.url}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                alt={item.id}
                loading="lazy"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Card>
    </UtilityBox>
  );
}
