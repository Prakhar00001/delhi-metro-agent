import os
import pandas as pd
import networkx as nx

GTFS_DIR = os.path.join(os.path.dirname(__file__), "gtfs")

def get_delhi_metro_graph():
    G = nx.Graph()
    try:
        stops_df = pd.read_csv(os.path.join(GTFS_DIR, "stops.csv"))
        routes_df = pd.read_csv(os.path.join(GTFS_DIR, "routes.csv"))
        trips_df = pd.read_csv(os.path.join(GTFS_DIR, "trips.csv"))
        stop_times_df = pd.read_csv(os.path.join(GTFS_DIR, "stop_times.csv"))
    except FileNotFoundError:
        print(f"Error: Make sure stops.csv, routes.csv, trips.csv, and stop_times.csv are inside {GTFS_DIR}")
        return G

    for _, row in stops_df.iterrows():
        stop_name = str(row['stop_name']).strip()
        G.add_node(stop_name, stop_id=row['stop_id'], lat=row.get('stop_lat', 0), lon=row.get('stop_lon', 0), lines=set())

    trip_to_route = dict(zip(trips_df['trip_id'], trips_df['route_id']))
    route_to_name = dict(zip(routes_df['route_id'], routes_df['route_long_name']))
    id_to_name = dict(zip(stops_df['stop_id'], stops_df['stop_name']))

    stop_times_df = stop_times_df.sort_values(by=['trip_id', 'stop_sequence'])
    for _, group in stop_times_df.groupby('trip_id'):
        station_list = group.to_dict('records')
        for i in range(len(station_list) - 1):
            curr_name = id_to_name.get(station_list[i]['stop_id'], "").strip()
            next_name = id_to_name.get(station_list[i+1]['stop_id'], "").strip()
            if not curr_name or not next_name or curr_name == next_name: continue
            
            route_id = trip_to_route.get(station_list[i]['trip_id'])
            line_name = route_to_name.get(route_id, "Metro Link")

            G.nodes[curr_name]['lines'].add(line_name)
            G.nodes[next_name]['lines'].add(line_name)

            duration_mins = 3  # Stable parsing fallback
            if G.has_edge(curr_name, next_name):
                G[curr_name][next_name]['weight'] = min(G[curr_name][next_name]['weight'], duration_mins)
            else:
                G.add_edge(curr_name, next_name, weight=duration_mins, primary_line=line_name)

    for node in G.nodes:
        G.nodes[node]['lines'] = list(G.nodes[node]['lines'])
    return G

def calculate_fare(num_stations: int) -> int:
    if num_stations <= 2: return 10
    if num_stations <= 5: return 20
    if num_stations <= 12: return 30
    if num_stations <= 21: return 40
    return 60