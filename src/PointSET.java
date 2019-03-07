import edu.princeton.cs.algs4.Queue;
import edu.princeton.cs.algs4.SET;

public class PointSET {
	// construct an empty set of points
private SET<Point2D> point;
public PointSET(){
	// construct an empty set of points 
	 point = new SET<Point2D>();
}
	public boolean isEmpty() {
		// is the set empty?
		return point.size() == 0;
	}

	public int size() {
		return point.size();
	}

	public void insert(Point2D p) {
		// add the point to the set (if it is not already in the set)
		point.add(p);
	}

	public boolean contains(Point2D p) {
		// does the set contain point p?
		return point.contains(p);
	}

	public void draw() {
		// draw all points to standard draw
		for(Point2D p :point){
			p.draw();
		}
	}

	public Iterable<Point2D> range(RectHV rect) {
		// all points that are inside the rectangle
		Queue<Point2D> queue = new Queue<Point2D>();
	      for (Point2D p : point ) {
	         if (rect.contains(p)) {
	            queue.enqueue(p);
	         }
	      }
	      return queue;
	}

	public Point2D nearest(Point2D p) {
		// a nearest neighbor in the set to point p; null if the set is empty
		Point2D other = null;
		double distance = 0;
		for(Point2D pr :point){
			if(other == null){
				other = pr;
				distance = p.distanceTo(pr);
			}
			else if(p.distanceTo(pr)<distance){
				other = pr;
				distance = p.distanceTo(pr);
			}
			
		}
		return other;
	}

	public static void main(String[] args) {
		// unit testing of the methods (optional)
	}
	
}
