import java.awt.Color;
import java.awt.Color;

public class SeamCarver
{
	private Picture pic;
	private double[][] energies;

	public SeamCarver(Picture picture)
	{
		// create a seam carver object based on the given picture
		if (picture == null)
		{
			throw new java.lang.NullPointerException();
		}
		if (picture.getClass().isAnnotation())
		{
			throw new java.lang.IllegalArgumentException();
		}
		pic = picture;
		updateEnergy();
	}

	public Picture picture()
	{
		return pic;
	}

	public int width()
	{
		return pic.width();
	}

	public int height()
	{
		return pic.height();
	}

	public double energy(int x, int y)
	{
		return energies[x][y];
	}

	private void updateEnergy()
	{
		energies = new double[this.width()][this.height()];
		for (int i = 0; i < energies.length; i++)
		{
			for (int j = 0; j < energies[0].length; j++)
			{
				energies[i][j] = calcEnergy(i, j);
			}
		}
	}

	private double calcEnergy(int x, int y)
	{
		// energy of pixel at column x and row y
		double energy = 0;

		if (x == 0 || y == 0 || x == pic.width() - 1 || y == pic.height() - 1)
		{
			energy = 195075; // 255^2 + 255^2 +255^
		} else
		{
			Color x1 = pic.get(x - 1, y);
			Color x2 = pic.get(x + 1, y);
			double energyX = Math.pow((x2.getRed() - x1.getRed()), 2)
					+ Math.pow((x2.getGreen() - x1.getGreen()), 2)
					+ Math.pow((x2.getBlue() - x1.getBlue()), 2);

			Color y1 = pic.get(x, y - 1);
			Color y2 = pic.get(x, y + 1);
			double energyY = Math.pow((y2.getRed() - y1.getRed()), 2)
					+ Math.pow((y2.getGreen() - y1.getGreen()), 2)
					+ Math.pow((y2.getBlue() - y1.getBlue()), 2);
			energy = energyX + energyY;
		}
		return energy;
	}

	public int[] findHorizontalSeam()
	{
		int width = width();
		int height = height();

		double[][] distance = new double[width][height];
		int[][] indexY = new int[width][height];
		int[] answer = new int[width];

		for (int i = 0; i < width; i++)
		{
			for (int j = 0; j < height; j++)
			{
				if (i == 0)
				{
					distance[i][j] = 0;
				} else
				{
					distance[i][j] = Double.MAX_VALUE;
				}
			}
		}
		double dis = -1;

		for (int i = 1; i < width; i++)
		{
			for (int j = 0; j < height; j++)
			{
				relaxH(i, j, indexY, distance);
				if (i == width - 1)
				{
					if (dis == -1 || dis > distance[i][j])
					{
						dis = distance[i][j];
						answer[width - 1] = j;
					}
				}
			}
		}
		for (int k = width - 2; k >= 0; k--)
		{
			answer[k] = indexY[k + 1][answer[k + 1]];
		}
		return answer;
		// sequence of indices for horizontal seam
	}

	public int[] findVerticalSeam()
	{ 

		int width = width();
		int height = height();
		double[][] distance = new double[width][height];
		int[][] indexX = new int[width][height];
		int[] answer = new int[height];
		for (int i = 0; i < height; i++)
		{
			for (int j = 0; j < width; j++)
			{
				if (i == 0)
				{
					distance[j][i] = 0;
				} else
				{
					distance[j][i] = Double.MAX_VALUE;
				}

			}
		}
		double dis = -1;

		for (int i = 0; i < height; i++)
		{
			for (int j = 0; j < width; j++)
			{
				relaxV(j, i, indexX, distance);
				if (i == height - 1)
				{
					if (dis == -1 || dis > distance[j][i])
					{
						dis = distance[j][i];
						answer[i] = j;
					}
				}
			}
		}
		for (int k = height-2; k >= 0; k--)
		{
			answer[k] = indexX[answer[k + 1]][k + 1];
		}
		return answer;
	}

	public void removeHorizontalSeam(int[] seam)
	{
		// remove horizontal seam from current picture
		Picture picN = new Picture(this.width(), this.height() - 1);
		if (seam == null)
		{
			throw new java.lang.NullPointerException();
		}
		if (this.width() <= 1 || this.height() <= 1
				|| seam.length != this.width() || npossible(seam))
		{
			// FIXME
			throw new RuntimeException("!!! Text should  be here ");
		}

		for (int x = 0; x < picN.width(); x++)
		{
			int yy = 0;
			for (int y = 0; y < picN.height(); y++, yy++)
			{
				if (seam[x] == y)
				{
					yy++;
				}
				picN.set(x, y, pic.get(x, yy));
			}
		}
		pic = picN;
		this.updateEnergy();
	}

	public void removeVerticalSeam(int[] seam)
	{
		Picture picN = new Picture(this.width() - 1, this.height());
		if (seam == null)
		{
			throw new java.lang.NullPointerException();
		}
		if (this.width() <= 1 || this.height() <= 1
				|| seam.length != this.height() || npossible(seam))
		{
			// FIXME
			throw new RuntimeException("!!! Text should  be here "
					+ this.width() + " " + this.height() + " " + seam.length
					+ " " + npossible(seam));
		}

		for (int y = 0; y < picN.height(); y++)
		{
			int xx = 0;
			for (int x = 0; x < picN.width(); x++, xx++)
			{
				if (seam[y] == x)
				{
					xx++;
				}

				picN.set(x, y, pic.get(xx, y));

			}
		}
		pic = picN;
		this.updateEnergy();
	}

	// remove vertical seam from current picture

	private void relaxH(int x, int y, int[][] indexY, double[][] distance)
	{
		if (x == 0)
		{
			return;
		}
		if (y - 1 != -1
				&& distance[x][y] > distance[x - 1][y - 1] + energies[x][y])
		{
			distance[x][y] = distance[x - 1][y - 1] + energies[x][y];
			indexY[x][y] = y - 1;
		}
		if (distance[x][y] > distance[x - 1][y] + energies[x][y])
		{
			distance[x][y] = distance[x - 1][y] + energies[x][y];
			indexY[x][y] = y;
		}
		if (y + 1 != height()
				&& distance[x][y] > distance[x - 1][y + 1] + energies[x][y])
		{
			distance[x][y] = distance[x - 1][y + 1] + energies[x][y];
			indexY[x][y] = y + 1;
		}

	}

	private void relaxV(int x, int y, int[][] indexX, double[][] distance)
	{
		if (y == 0)
		{
			return;
		}

		if (x - 1 != -1
				&& distance[x][y] > distance[x - 1][y - 1] + energies[x][y])
		{
			distance[x][y] = distance[x - 1][y - 1] + energies[x][y];
			indexX[x][y] = x - 1;
		}
		if (distance[x][y] > distance[x][y - 1] + energies[x][y])
		{
			distance[x][y] = distance[x][y - 1] + energies[x][y];
			indexX[x][y] = x;
		}
		if (x + 1 != energies.length
				&& distance[x][y] > distance[x + 1][y - 1] + energies[x][y])
		{
			distance[x][y] = distance[x + 1][y - 1] + energies[x][y];
			indexX[x][y] = x + 1;
		}

	}

	private boolean npossible(int[] seam)
	{
		int prev = seam[0];
		for (int i = 1; i < seam.length; i++)
		{
			if (Math.abs(prev - seam[i]) > 1)
			{
				return true;
			}
			prev = seam[i];
		}
		return false;
	}
}