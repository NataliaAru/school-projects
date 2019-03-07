import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;
import java.util.TreeSet;

public class BaseballElimination {
	private Map<String, Integer> namesM;
	private Map<Integer, String> numberM;
	private int[][] totalM;
	private int[][] remainingM;
	int maxWin = 0;
	String maxwinTeam = "";

	int games = 0;
	int teams = 0;
	int netSize = 0;
	int startVertex = 0;
	int endVertex = 0;

	public BaseballElimination(String filename) {
		In in = new In(filename);

		// Count of teams:
		int cTeams = Integer.parseInt(in.readLine());
		namesM = new TreeMap<String, Integer>();
		numberM = new TreeMap<Integer, String>();
		totalM = new int[cTeams][3];
		remainingM = new int[cTeams][cTeams];

		for (int iTeam = 0; iTeam < cTeams; iTeam++) {
			String line = in.readLine();
			Scanner lineScanner = new Scanner(line);

			// Name of team:
			String name = lineScanner.next();
			namesM.put(name, iTeam);
			numberM.put(iTeam, name);
			// Number of wins for the team
			int win = lineScanner.nextInt();
			totalM[iTeam][0] = win;
			// update max win. it will be used for trivial elimination.
			if (win > maxWin) {
				maxWin = win;
				maxwinTeam = name;
			}

			// Number of losses for the team
			totalM[iTeam][1] = lineScanner.nextInt();

			// Number of total remaining games for the team
			totalM[iTeam][2] = lineScanner.nextInt();

			for (int iAgainst = 0; iAgainst < cTeams; iAgainst++) {
				// Number of games remaining between iTeam and iAgainst
				remainingM[iTeam][iAgainst] = lineScanner.nextInt();
			}

			lineScanner.close();
		}

		teams = numberOfTeams();
		games = (teams * teams - teams) / 2;
		netSize = teams + games + 2;
		endVertex = netSize - 1;
		System.out.println(namesM);
	}

	public int numberOfTeams() {
		return totalM.length;
	}

	// all teams
	public Iterable<String> teams() {
		// throw new UnsupportedOperationException();
		return namesM.keySet();
	}

	public int wins(String team) {
		if (!namesM.containsKey(team)) {
			throw new IllegalArgumentException();
		}
		return totalM[namesM.get(team)][0];
	}

	public int losses(String team) {
		if (!namesM.containsKey(team)) {
			throw new IllegalArgumentException();
		}
		return totalM[namesM.get(team)][1];
	}

	public int remaining(String team) {
		if (!namesM.containsKey(team)) {
			throw new IllegalArgumentException();
		}
		return totalM[namesM.get(team)][2];
	}

	public int against(String team1, String team2) {
		if (!namesM.containsKey(team1)|| !namesM.containsKey(team2)) {
			throw new IllegalArgumentException();
		}

		return remainingM[namesM.get(team1)][namesM.get(team2)];
	}

	public boolean isEliminated(String team) {
		if (!namesM.containsKey(team)) {
			throw new IllegalArgumentException();
		}
		//trivial
		int teamID = namesM.get(team);
		int nPossibleWins = totalM[teamID][0] + totalM[teamID][2];
		boolean bEliminated = nPossibleWins < maxWin;
		//non trivial
		if (!bEliminated) {
			FlowNetwork net = buildFlowNetwork(teamID, nPossibleWins);
			FordFulkerson f = new FordFulkerson(net, 0, endVertex);
			Iterable<FlowEdge> edges = net.edges();
			int n = 0;
			for (FlowEdge flowEdge : edges) {
				if (flowEdge.from() == 0) {
					n += f.inCut(flowEdge.to())
							&& flowEdge.capacity() != flowEdge.flow() ? 1 : 0;
				}
			}
			// at least one flow is less then capacity
			bEliminated = n > 0;
		}
		return bEliminated;
	}

	public Iterable<String> certificateOfElimination(String team) {
		if (!namesM.containsKey(team)) {
			throw new IllegalArgumentException();
		}
		// if in cut then add, if more wins then add
		TreeSet<String> lst = new TreeSet<String>();
		String sWinner = null;
		int wins = Integer.MAX_VALUE;

		int teamID = namesM.get(team);
		int nPossibleWins = totalM[teamID][0] + totalM[teamID][2];
		//

		FlowNetwork net = buildFlowNetwork(teamID, nPossibleWins);
		FordFulkerson f = new FordFulkerson(net, 0, endVertex);

		Iterable<FlowEdge> e = net.adj(endVertex);
		for (FlowEdge flowEdge : e) {
			int tID = flowEdge.from() - games - 1;
			String sName = numberM.get(tID);

			//
			if (flowEdge.capacity() == 0 && totalM[tID][0] > nPossibleWins
					&& wins > tID) {
				//
				wins = tID;
				sWinner = sName;
			}

			if (f.inCut(flowEdge.from())) {

				lst.add(sName);
				//

			}
			if (null != sWinner) {
				lst.clear();
				lst.add(sWinner);
			}
		}

		//
		// }
		if (lst.isEmpty()) {
			return null;
		}
		return lst;
	}

	private FlowNetwork buildFlowNetwork(int teamId, int nPossibleWins) {
		FlowNetwork net = new FlowNetwork(netSize);
		int gameVertexID = 1;
		//go through teams
		for (int i = 0; i < teams - 1; i++) {
			for (int j = i + 1; j < teams; j++, gameVertexID++) {
// add adges
				if (i != teamId && j != teamId) {
					FlowEdge s2Game = new FlowEdge(startVertex, gameVertexID,
							remainingM[i][j]);
					//second to third
					FlowEdge game2Team1 = new FlowEdge(gameVertexID, games + i
							+ 1, Double.MAX_VALUE);
					FlowEdge game2Team2 = new FlowEdge(gameVertexID, games + j
							+ 1, Double.MAX_VALUE);
					// System.out.println("Add edge: " + s2Game);
					net.addEdge(s2Game);
					net.addEdge(game2Team1);
					net.addEdge(game2Team2);
				}
			}
		}
		for (int i = 0; i < teams; i++) {
			if (i != teamId) {
				int capacity = Math.max(0, nPossibleWins - totalM[i][0]);
				FlowEdge team2Sink = new FlowEdge(games + i + 1, endVertex,
						capacity);
				net.addEdge(team2Sink);
			}
		}

		return net;
	}

	public static void main(String[] args) {
		BaseballElimination division = new BaseballElimination(args[0]);

		for (String team : division.teams()) {
			if (division.isEliminated(team)) {
				StdOut.print(team + " is eliminated by the subset R = { ");
				for (String t : division.certificateOfElimination(team)) {
					StdOut.print(t + " ");
				}
				StdOut.println("}");
			} else {
				StdOut.println(team + " is not eliminated");
			}
		}
	}
}
