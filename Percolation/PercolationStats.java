/*--------------------------------------------
 * Author:Natalia Abrosimova
 * Written:3/07/2014
 * Last updated:25/07/2014
 * 
 * Compilation:javac PercolationStats.java
 * Execution:java PercolationStats
 * 
 * tests grid and percolation.
 * 
 *--------------------------------------------*/

public class PercolationStats
{
	private int side;
	private int times;
	private double[] opens;

	// runs t number of tests
	public PercolationStats(int N, int T)
	{
		if (N <= 0 || T <= 0)
		{
			throw new IllegalArgumentException("n must be positive");
		}
		side = N;
		times = T;
		opens = new double[T];

		{

			for (int i = 0; i < times; i++)
			{
				Percolation p = new Percolation(side);
				while (!p.percolates())
				{
					int r = (int) ((Math.random() * side) + 1);
					int c = (int) ((Math.random() * side) + 1);
					if (!p.isOpen(r, c))
					{
						p.open(r, c);
						opens[i] += 1;
					}
				}
				opens[i] = opens[i] / (side * side);
			}
		}
	}

	// returns mean
	public double mean()
	{
		double mean = 0;

		for (int i = 0; i < opens.length; i++)
		{
			mean += opens[i];
		}
		mean = mean / times;
		return mean;

	}

	// returns stddev
	public double stddev()
	{
		double stddev = 0;

		for (int i = 0; i < opens.length; i++)
		{
			stddev += (opens[i] - mean()) * (opens[i] - mean());
		}
		stddev = Math.sqrt(stddev / (times - 1));
		return stddev;

	}

	// returns confidence low
	public double confidenceLo()
	{
		double low = 0;
		low = (mean() - ((1.96 * stddev()) / Math.sqrt(times)));
		return low;

	}

	// returns confidence high
	public double confidenceHi()
	{
		double high = 0;
		high = (mean() + ((1.96 * stddev()) / Math.sqrt(times)));
		return high;

	}

	// prints out mean stddev, 95% confidence interval
	public static void main(String[] args)
	{
		if (args == null || args.length != 2)
		{
			throw new IllegalArgumentException();
		}

		int n = Integer.parseInt(args[0]);
		int t = Integer.parseInt(args[1]);

		PercolationStats PS = new PercolationStats(n, t);

		System.out.println("% java PercolationStats " + 5 + " " + 5);
		System.out.println("mean                    = " + PS.mean());
		System.out.println("stddev                  = " + PS.stddev());
		System.out.println("95% confidence interval = " + PS.confidenceLo()
				+ ", " + PS.confidenceHi());

	}
}