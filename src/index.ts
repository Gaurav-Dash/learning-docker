import express, { Request, Response, NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send(
    "Welcome! <br/> /factors?number={x} - Factor calculation <br/> /isPrime?number={x} - Check prime no"
  );
});

// Path - '/factors', Query Params - 'number'
app.get("/factors", (req: Request, res: Response, next: NextFunction) => {
  try {
    const numberParam = req.query.number;

    if (!numberParam || isNaN(Number(numberParam))) {
      throw new Error("Invalid or missing number parameter");
    }

    const number = Number(numberParam);
    if (number <= 0) {
      throw new Error("Number should be a positive integer");
    }

    const factors = findFactors(number);
    res.json({ number, factors });
  } catch (error) {
    next(error);
  }
});

app.get("/isPrime", (req: Request, res: Response, next: NextFunction) => {
  try {
    const numberParam = req.query.number;

    if (!numberParam || isNaN(Number(numberParam))) {
      throw new Error("Invalid or missing number parameter");
    }

    const number = Number(numberParam);
    if (number <= 0) {
      throw new Error("Number should be a positive integer");
    }

    const primeRes = isPrime(number) ? "a prime" : "not a prime";
    res.send(`${number} is ${primeRes} number`);
  } catch (error) {
    next(error);
  }
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });
});

const isPrime = (number: number) => {
  for (let i = 2, s = Math.sqrt(number); i <= s; i++) {
    if (number % i === 0) return false;
  }
  return number > 1;
};

const findFactors = (number: number): number[] => {
  const factors: number[] = [];
  for (let i = 1; i <= number; i++) {
    if (number % i === 0) {
      factors.push(i);
    }
  }
  return factors;
};

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
