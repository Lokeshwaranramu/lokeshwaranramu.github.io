#!/usr/bin/env python3
"""
Sitemap.xml Auto-Updater
Automatically updates all lastmod dates in sitemap.xml to today's date.
Run this script before deploying changes to keep sitemap fresh.

Usage: python update-sitemap.py
"""

import xml.etree.ElementTree as ET
from datetime import date
import os

def update_sitemap():
    """Update all lastmod dates in sitemap.xml to today's date"""
    
    # Get script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    sitemap_path = os.path.join(script_dir, 'sitemap.xml')
    
    if not os.path.exists(sitemap_path):
        print(f"❌ Error: sitemap.xml not found at {sitemap_path}")
        return False
    
    # Parse XML
    tree = ET.parse(sitemap_path)
    root = tree.getroot()
    
    # Get namespace
    ns = {'sm': 'http://www.sitemaps.org/schemas/sitemap/0.9'}
    
    # Today's date in YYYY-MM-DD format
    today = date.today().isoformat()
    
    # Update all lastmod elements
    updated_count = 0
    for url in root.findall('sm:url', ns):
        lastmod = url.find('sm:lastmod', ns)
        if lastmod is not None:
            old_date = lastmod.text
            lastmod.text = today
            if old_date != today:
                updated_count += 1
    
    # Write back to file with proper formatting
    # Register namespace to avoid ns0: prefix
    ET.register_namespace('', 'http://www.sitemaps.org/schemas/sitemap/0.9')
    ET.register_namespace('xsi', 'http://www.w3.org/2001/XMLSchema-instance')
    
    tree.write(sitemap_path, encoding='UTF-8', xml_declaration=True)
    
    print(f"✅ Sitemap updated successfully!")
    print(f"   📅 Updated {updated_count} lastmod date(s) to: {today}")
    print(f"   📄 File: {sitemap_path}")
    
    return True

if __name__ == "__main__":
    print("🔄 Updating sitemap.xml...")
    print()
    success = update_sitemap()
    print()
    if success:
        print("✨ Ready to deploy with fresh sitemap!")
    else:
        print("⚠️  Please check the error and try again.")
