import edu.princeton.cs.algs4.Queue;

public class KdTree
{
	private Node root;
	private int size;
	private Point2D end;
	private double distance;

	public KdTree()
	{
		// construct an empty set of points
		root = null;
		size = 0;
		end = null;
		distance = 0.0;
	}

	public boolean isEmpty()
	{
		// is the set empty?
		return root == null;
	}

	public int size()
	{
		// number of points in the set
		return size;
	}

	public void insert(Point2D p)
	{

		if (root == null)
		{
			root = new Node(p, true, new RectHV(0, 0, 1, 1), null, null);
			size++;
		}
		if (!this.contains(p))
		{
			inserting(p);
			size++;
		}

		// add the point to the set (if it is not already in the set)
	}

	public boolean contains(Point2D p)
	{
		// does the set contain point p?

		Node x = root;
		while (x != null)
		{
			if (x.compareToP(p) == 0)
				return true;
			else if (x.compareToP(p) == -1)
				x = x.right;
			else if (x.compareToP(p) == 1)
				x = x.left;
		}
		return false;
	}

	public void draw()
	{ // draw all of the points to standard draw
		StdDraw.setPenColor(StdDraw.BLACK);
		StdDraw.setPenRadius(.01);
		drawPoints(root);

		StdDraw.setPenRadius();
		drawLines(root, 0);
	}

	public Iterable<Point2D> range(RectHV rect)
	{
		// all points that are inside the rectangle

		Queue<Point2D> queue = new Queue<Point2D>();
		rangeP(queue, root, rect);
		return queue;
	}

	private void rangeP(Queue<Point2D> queue, Node x, RectHV rect)
	{
		if (x == null || !rect.intersects(x.rect))
		{
			return;
		} else
		{
			if (rect.contains(x.point))
			{
				queue.enqueue(x.point);
			}
			rangeP(queue, x.left, rect);
			rangeP(queue, x.right, rect);
		}
	}

	public Point2D nearest(Point2D p)
	{
		// a nearest neighbor in the set to point p; null if the set is empty
		if (root == null)
		{
			return null;
		} else
		{
			end = root.point;
			distance = p.distanceSquaredTo(end);
			nearestP(p, root);
			return end;
		}
	}

	private void nearestP(Point2D p, Node x)
	{
		if (x == null || x.rect.distanceSquaredTo(p) >= distance)
		{
			return;
		} else
		{
			if (distance > x.point.distanceSquaredTo(p))
			{
				end = x.point;
				distance = x.point.distanceSquaredTo(p);
			}
			nearestP(p, x.left);
			nearestP(p, x.right);
		}
	}

	private void inserting(Point2D p)
	{
		Node x = root;
		Node before = null;
		boolean right = true;
		while (x != null)
		{
			if (x.compareToP(p) == 0)
				return;
			else if (x.compareToP(p) == -1)
			{
				before = x;
				x = x.right;
				right = true;
			} else if (x.compareToP(p) == 1)
			{
				before = x;
				x = x.left;
				right = false;
			}
		}
		if (x == null)
		{
			if (right)
			{
				before.right = new Node(p, !before.vertical, rectangle(before,
						right), null, null);
			}
			if (!right)
			{
				before.left = new Node(p, !before.vertical, rectangle(before,
						right), null, null);
			}
		}
	}

	private RectHV rectangle(Node before, boolean right)
	{
		RectHV largeR = before.rect;
		if (right)
		{
			if (before.vertical)
			{
				return new RectHV(before.point.x(), largeR.ymin(),
						largeR.xmax(), largeR.ymax());
			} else
			{
				return new RectHV(largeR.xmin(), before.point.y(),
						largeR.xmax(), largeR.ymax());
			}
		} else
		{
			if (before.vertical)
			{
				return new RectHV(largeR.xmin(), largeR.ymin(),
						before.point.x(), largeR.ymax());
			} else
			{
				return new RectHV(largeR.xmin(), largeR.ymin(), largeR.xmax(),
						before.point.y());
			}

		}
	}

	private void drawLines(Node tree, int level)
	{
		if (tree == null)
		{
			return;
		}

		if (level % 2 == 0)
		{
			// even level means red, vertical line
			StdDraw.setPenColor(StdDraw.RED);
			StdDraw.line(tree.point.x(), tree.rect.ymin(), tree.point.x(),
					tree.rect.ymax());
		} else
		{
			// odd level means blue, horizontal line
			StdDraw.setPenColor(StdDraw.BLUE);
			StdDraw.line(tree.rect.xmin(), tree.point.y(), tree.rect.xmax(),
					tree.point.y());
		}
		level++;
		drawLines(tree.left, level);
		drawLines(tree.right, level);
	}

	private void drawPoints(Node tree)
	{
		if (tree == null)
		{
			return;
		}

		StdDraw.point(tree.point.x(), tree.point.y());

		drawPoints(tree.left);
		drawPoints(tree.right);
	}

	private static class Node
	{
		private Point2D point; // the point
		private boolean vertical;
		private RectHV rect; // the axis-aligned rectangle corresponding to this
								// node
		private Node left;// the left/bottom subtree
		private Node right; // the right/top subtree

		public Node(Point2D point, boolean ver, RectHV rect, Node left,
				Node right)
		{
			this.point = point;
			this.vertical = ver;
			this.rect = rect;
			this.left = left;
			this.right = right;

		}

		// other is a point in the node that is going to be inserted in tree
		public int compareToP(Point2D other)
		{

			if (this.point.x() == other.x() && this.point.y() == other.y())
				return 0;
			if (vertical)
			{
				if (this.point.x() > other.x())
				{
					return 1; // for left
				}
				if (this.point.x() <= other.x())
				{
					return -1; // for right
				}
			} else
			{
				if (this.point.y() > other.y())
				{
					return 1; // for bottom
				}
				if (this.point.y() <= other.y())
				{
					return -1; // for top
				}
			}
			return -1;
		}
	}

}
