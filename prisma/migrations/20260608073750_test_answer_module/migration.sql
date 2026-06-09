-- CreateTable
CREATE TABLE "TestAnswer" (
    "id" TEXT NOT NULL,
    "selectedAnswer" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "testAttemptId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TestAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TestAnswer" ADD CONSTRAINT "TestAnswer_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestAnswer" ADD CONSTRAINT "TestAnswer_testAttemptId_fkey" FOREIGN KEY ("testAttemptId") REFERENCES "TestAttempt"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
