import edu.princeton.cs.algs4.WeightedQuickUnionUF;

/*--------------------------------------------
 * Author:Natalia Abrosimova
 * Written:3/07/2014
 * Last updated:25/07/2014
 * 
 * Compilation:javac Percolation.java
 * Execution:java PercolationStats
 * 
 * Creates n size percolation grid.
 * 
 *--------------------------------------------*/

public class Percolation
{
	private WeightedQuickUnionUF quickCheckFull = null;
	private WeightedQuickUnionUF quickPer = null;
	private boolean[][] opened;
	private int n;

	// create N by N grid, with all sites blocked

	public Percolation(int N)
	{
		if (N <= 0)
		{
			throw new IllegalArgumentException("less than or equal to 0");
		}
		this.n = N;
		quickCheckFull = new WeightedQuickUnionUF(N * N + 1);
		quickPer = new WeightedQuickUnionUF(N * N + 2);

		opened = new boolean[N][N];
		for (int i = 0; i < N; i++)
		{
			for (int j = 0; j < N; j++)
			{
				opened[i][j] = false;
			}

		}

	}

	// open site and connect to other open sites
	public void open(int r, int c)
	{

		int i = r - 1;
		int j = c - 1;
		if (i < 0 || j < 0 || i > n - 1 || j > n - 1)
		{
			throw new IndexOutOfBoundsException("Illegal parameter value.");
		}
		opened[i][j] = true;
		if (i > 0 && isOpen(r - 1, c))
		{
			quickCheckFull.union(tolinear(i, j), tolinear(i - 1, j));
			quickPer.union(tolinear(i, j), tolinear(i - 1, j));
		}

		if (i < n - 1 && isOpen(r + 1, c))
		{
			quickCheckFull.union(tolinear(i, j), tolinear(i + 1, j));
			quickPer.union(tolinear(i, j), tolinear(i + 1, j));
		}

		if (j > 0 && isOpen(r, c - 1))
		{
			quickCheckFull.union(tolinear(i, j), tolinear(i, j - 1));
			quickPer.union(tolinear(i, j), tolinear(i, j - 1));
		}

		if (j < n - 1 && isOpen(r, c + 1))
		{
			quickCheckFull.union(tolinear(i, j), tolinear(i, j + 1));
			quickPer.union(tolinear(i, j), tolinear(i, j + 1));
		}
		if (i == 0)
		{
			quickCheckFull.union(tolinear(i, j), n * n);
			quickPer.union(tolinear(i, j), n * n);
		}
		if (i == n - 1)
		{
			quickPer.union(tolinear(i, j), n * n + 1);
		}

	}

	// is site open
	public boolean isOpen(int i, int j)
	{

		if (j < 1 || i < 1 || i > n || j > n)
		{
			throw new IndexOutOfBoundsException("Illegal parameter value. i = "
					+ i + ", j = " + j);
		}
		return (opened[i - 1][j - 1]);

	}

	// is site closed
	public boolean isFull(int i, int j)
	{
		if (j < 1 || i < 1 || i > n || j > n)
		{
			throw new IndexOutOfBoundsException("Illegal parameter value. i = "
					+ i + ", j = " + j);
		}
		return quickCheckFull.connected((tolinear(i - 1, j - 1)), n * n);
	}

	// return boolean does it percolates
	public boolean percolates()
	{
		return quickPer.connected(n * n, n * n + 1);
	}
//point to int
	private int tolinear(int i, int j)
	{
		return ((i * n) + j);
	}

	public static void main(String[] args)
	{
		int n = 3;
		Percolation p = new Percolation(n);
		p.open(3, 1);
		p.open(2, 1);
		p.open(1, 1);
		p.open(3, 3);

		System.out.println(p.percolates());
		System.out.println(p.isFull(3, 3));

		for (int i = 1; i <= n; i++)
		{
			for (int j = 1; j <= n; j++)
			{
				System.out.print("   "
						+ String.valueOf(p.isFull(i, j)).toUpperCase()
							.charAt(0)
						+ String.valueOf(p.isOpen(i, j)).toUpperCase()
							.charAt(0));
			}
			System.out.println();
		}
		System.out.println(p.percolates());
	}
}
