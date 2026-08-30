FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps
COPY . .
ARG VITE_GA4_MEASUREMENT_ID
ARG VITE_GOOGLE_ADS_ID
ARG VITE_META_PIXEL_ID
ARG VITE_WEB3FORMS_ACCESS_KEY
ENV VITE_GA4_MEASUREMENT_ID=$VITE_GA4_MEASUREMENT_ID
ENV VITE_GOOGLE_ADS_ID=$VITE_GOOGLE_ADS_ID
ENV VITE_META_PIXEL_ID=$VITE_META_PIXEL_ID
ENV VITE_WEB3FORMS_ACCESS_KEY=$VITE_WEB3FORMS_ACCESS_KEY
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
