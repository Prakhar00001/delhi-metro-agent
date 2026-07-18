def get_live_metro_status():
    """Simulates dynamic network disruptions, delays, and monsoon impacts."""
    return {
        "delays": {
            "Yellow Line": {"delay_mins": 7, "reason": "Signal glitch near Green Park"},
            "Blue Line": {"delay_mins": 0, "reason": "Normal operations"},
            "Magenta Line": {"delay_mins": 0, "reason": "Normal operations"},
            "Violet Line": {"delay_mins": 12, "reason": "Track maintenance near Nehru Place"}
        },
        "crowding": {
            "Rajiv Chowk": "Extreme",
            "Hauz Khas": "High",
            "Kashmere Gate": "High",
            "Huda City Centre": "Moderate"
        },
        "weather": {
            "condition": "Monsoon Downpour",
            "impact_on_auto": "Severe surge pricing; recommend e-rickshaws via exit 3."
        }
    }