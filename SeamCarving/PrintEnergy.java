import java.util.Arrays;

public class PrintEnergy
{
	public static void main(String[] args)
	{
		Picture inputImg = new Picture(args[0]);
		System.out.printf("image is %d pixels wide by %d pixels high.\n",
				inputImg.width(), inputImg.height());

		SeamCarver sc = new SeamCarver(inputImg);

		System.out.printf("Printing energy calculated for each pixel.\n");

		for (int j = 0; j < sc.height(); j++)
		{
			for (int i = 0; i < sc.width(); i++)
				System.out.printf("%s ", sc.picture().get(i, j).toString());

			System.out.println();
		}

		int[] hc = sc.findVerticalSeam();

		System.out.println(Arrays.toString(hc));
		// int[] k = new int[]{0, 0, 0, 0, 0, 1};
		sc.removeVerticalSeam(hc);
		System.out.printf("Printing energy calculated for each pixel.\n");
		for (int j = 0; j < sc.height(); j++)
		{
			for (int i = 0; i < sc.width(); i++)
				System.out.printf("%s ", sc.picture().get(i, j).toString());

			System.out.println();
		}
	}

}
