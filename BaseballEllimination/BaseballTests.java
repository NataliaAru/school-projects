import static org.junit.Assert.*;

import java.util.ArrayList;

import org.junit.Test;

public class BaseballTests 
{
	private String[] getFiles(String teams)
	{
		String[] teamNumbers = teams.split(",");
		String[] retVal = new String[teamNumbers.length];
		
		int i = 0;
		for(String teamNumber : teamNumbers)
		{
			retVal[i++] = "testInput\\teams" + teamNumber + ".txt";
		}
		
		return retVal;
	}
	
	@Test
	public void testNumberOfTeams()
	{
		for (String filename : getFiles("4,5,8,10,29,48"))
		{ 
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			assertEquals(expected.numberOfTeams(), actual.numberOfTeams());
		}		
	}
	
	@Test
	public void testTeams()
	{
		for (String filename : getFiles("4,5,8,10,29,48"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			assertIterableEquals(expected.teams(), actual.teams());
		}		
	}
	
	@Test
	public void testWins()
	{
		for (String filename : getFiles("4,5,8,10,29,48"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				assertEquals(expected.wins(teamName), actual.wins(teamName));
			}
		}		
	}
	
	@Test
	public void testLosses()
	{
		for (String filename : getFiles("4,5,8,10,29,48"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				assertEquals(expected.losses(teamName), actual.losses(teamName));
			}
		}		
	}
	
	@Test
	public void testRemaining()
	{
		for (String filename : getFiles("4,5,8,10,29,48"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				assertEquals(expected.remaining(teamName), actual.remaining(teamName));
			}
		}		
	}
	
	@Test
	public void testAgainst()
	{
		for (String filename : getFiles("4,5,8,10,29,48"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String team1Name : expected.teams())
			{
				for (String team2Name : expected.teams())
				{
					assertEquals(expected.against(team1Name, team2Name), actual.against(team1Name, team2Name));
				}
			}
		}		
	}
	
	@Test
	public void testIsEliminated()
	{
		for (String filename : getFiles("4,4a,4b,5,5a,5b,7,8,10,12,24,29,30,32,36,42,48,12-allgames"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				assertEquals(expected.isEliminated(teamName), actual.isEliminated(teamName));
			}
		}		
	}
	
	@Test
	public void testCertificateEliminatedConsistency()
	{
		for (String filename : getFiles("4,5,8,10,29,48"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				boolean isEliminated = actual.isEliminated(teamName);
				boolean hasCertificate = actual.certificateOfElimination(teamName) != null;
				
				assertEquals(isEliminated, hasCertificate);
			}
		}		
	}
	
	private void assertIterableEquals(Iterable<String> expected, Iterable<String> actual)
	{
		if (expected != null)
		{
			ArrayList<String> expectedValues = new ArrayList<String>();				
			for(String expectedValue : expected)
			{
				expectedValues.add(expectedValue);
			}
			
			ArrayList<String> actualValues = new ArrayList<String>();
			for(String actualValue : actual)
			{
				actualValues.add(actualValue);
			}
			
			assertTrue(expectedValues.equals(actualValues));
		}
		else
		{
			assertTrue(actual == null);
		}		
	}
	
	@Test
	public void testCertificateOfElimination()
	{
		for (String filename : getFiles("4,4a,4b,5,5a,5b,7,8,10,12,24,29,30,32,36,42,48,12-allgames"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				assertIterableEquals(expected.certificateOfElimination(teamName), actual.certificateOfElimination(teamName));
			}			
		}		
	}
	
	@Test
	public void testCertificateBeforeAfter()
	{
		int i = 0;
		for (String filename : getFiles("4,4,5,5,29,29"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				if (i%2 == 0)
				{
					assertEquals(expected.isEliminated(teamName), actual.isEliminated(teamName));
				}
				
				if (expected.isEliminated(teamName))
				{
					ArrayList<String> expectedCert = new ArrayList<String>();				
					for(String expectedTeam : expected.certificateOfElimination(teamName))
					{
						expectedCert.add(expectedTeam);
					}
					
					ArrayList<String> actualCert = new ArrayList<String>();
					for(String actualTeam : actual.certificateOfElimination(teamName))
					{
						actualCert.add(actualTeam);
					}
					
					assertTrue(expectedCert.equals(actualCert));
				}
				else
				{
					assertTrue(actual.certificateOfElimination(teamName) == null);
				}

				if (i%2 == 1)
				{
					assertEquals(expected.isEliminated(teamName), actual.isEliminated(teamName));
				}
			}
			
			i++;	
		}	
	}
	
	@Test
	public void testOneTeam()
	{
		for (String filename : getFiles("1"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			assertEquals(expected.numberOfTeams(), actual.numberOfTeams());
			
			assertIterableEquals(expected.teams(), actual.teams());

			for (String teamName : expected.teams())
			{
				assertEquals(expected.wins(teamName), actual.wins(teamName));

				assertEquals(expected.losses(teamName), actual.losses(teamName));

				assertEquals(expected.remaining(teamName), actual.remaining(teamName));
				
				for (String team2Name : expected.teams())
				{
					assertEquals(expected.against(teamName, team2Name), actual.against(teamName, team2Name));
				}
				
				assertEquals(expected.isEliminated(teamName), actual.isEliminated(teamName));
				
				assertIterableEquals(expected.certificateOfElimination(teamName), actual.certificateOfElimination(teamName));
			}
		}		
	}
	
	@Test
	public void testInvalidArguments()
	{
		int i = 0;
		for (String filename : getFiles("4,5"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			try
			{
				actual.wins("WEOIFJWOIEF");
				assertTrue(false);
			}
			catch(IllegalArgumentException ex)
			{
			}
			
			try
			{
				actual.losses("WEOIFJWOIEF");
				assertTrue(false);
			}
			catch(IllegalArgumentException ex)
			{
			}
			
			try
			{
				actual.remaining("WEOIFJWOIEF");
				assertTrue(false);
			}
			catch(IllegalArgumentException ex)
			{
			}
			
			try
			{
				actual.against("WEOIFJWOIEF", expected.teams().iterator().next());
				assertTrue(false);
			}
			catch(IllegalArgumentException ex)
			{
			}
			
			try
			{
				actual.against(expected.teams().iterator().next(), "WEOIFJWOIEF");
				assertTrue(false);
			}
			catch(IllegalArgumentException ex)
			{
			}

			
			try
			{
				actual.isEliminated("WEOIFJWOIEF");
				assertTrue(false);
			}
			catch(IllegalArgumentException ex)
			{
			}
			
			try
			{
				actual.certificateOfElimination("WEOIFJWOIEF");
				assertTrue(false);
			}
			catch(IllegalArgumentException ex)
			{
			}
		}
	}
	
	@Test
	public void testIsEliminatedTiming()
	{
		long actualTimeStart = System.nanoTime();
		for (String filename : getFiles("4,4a,4b,5,5a,5b,7,8,10,12,24,29,30,32,36,42,48,12-allgames"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			
			for (String teamName : actual.teams())
			{
				actual.isEliminated(teamName);
			}
		}

		long actualTimeEnd = System.nanoTime();
		long actualTime = actualTimeEnd - actualTimeStart;
		
		long expectedTimeStart = System.nanoTime();
		for (String filename : getFiles("4,4a,4b,5,5a,5b,7,8,10,12,24,29,30,32,36,42,48,12-allgames"))
		{
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				expected.isEliminated(teamName);
			}
		}

		long expectedTimeEnd = System.nanoTime();
		long expectedTime = expectedTimeEnd - expectedTimeStart;
		
		assertTrue(actualTime <= 5 * expectedTime);
	}

	@Test
	public void testCertificateOfEliminationTiming()
	{
		long actualTimeStart = System.nanoTime();
		for (String filename : getFiles("4,4a,4b,5,5a,5b,7,8,10,12,24,29,30,32,36,42,48,12-allgames"))
		{
			BaseballElimination actual = new BaseballElimination(filename);
			
			for (String teamName : actual.teams())
			{
				actual.certificateOfElimination(teamName);
			}
		}

		long actualTimeEnd = System.nanoTime();
		long actualTime = actualTimeEnd - actualTimeStart;
		
		long expectedTimeStart = System.nanoTime();
		for (String filename : getFiles("4,4a,4b,5,5a,5b,7,8,10,12,24,29,30,32,36,42,48,12-allgames"))
		{
			BaseballEliminationSol expected = new BaseballEliminationSol(filename);
			
			for (String teamName : expected.teams())
			{
				expected.certificateOfElimination(teamName);
			}
		}

		long expectedTimeEnd = System.nanoTime();
		long expectedTime = expectedTimeEnd - expectedTimeStart;

		assertTrue(actualTime <= 5 * expectedTime);
	}	
}
