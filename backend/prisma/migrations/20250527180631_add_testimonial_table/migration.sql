-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "stars" DECIMAL(65,30) NOT NULL,
    "starsLabel" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "author" TEXT NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);
